import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportTransactions(transactions) {

  const data = transactions.map((row, index) => ({
    "S.No": index + 1,
    Date: row.date,
    Type: row.type,
    Amount: row.amount,
    "Payment Received": row.paymentReceived,
    "Payment Sent": row.paymentSent,
    Remarks: row.remarks,
    "Opening Balance": row.openingBalance,
    "Closing Balance": row.closingBalance,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Transactions"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const today = new Date().toISOString().split("T")[0];

  saveAs(file, `Transactions_${today}.xlsx`);

}