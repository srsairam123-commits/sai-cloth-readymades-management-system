import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";

import { exportTransactions } from "../../utils/exportExcel";
import { getTransactions } from "../../services/api";

function TableHeader() {

  const handleExport = async () => {

    const response = await getTransactions();

    if (response.success) {

      exportTransactions(response.transactions);

    } else {

      alert("Unable to export data.");

    }

  };

  const handlePrint = async () => {

    const response = await getTransactions();

    if (!response.success) {

      alert("Unable to load transactions.");

      return;

    }

    const rows = response.transactions;

    let html = `

    <html>

    <head>

      <title>Transaction Report</title>

      <style>

        body{
          font-family:Arial;
          padding:20px;
        }

        h2,h3{
          text-align:center;
          margin:5px;
        }

        table{
          width:100%;
          border-collapse:collapse;
          margin-top:20px;
        }

        th,td{
          border:1px solid #000;
          padding:8px;
          text-align:center;
        }

        th{
          background:#f2f2f2;
        }

      </style>

    </head>

    <body>

      <h2>Sai Cloth & Readymades</h2>

      <h3>Transaction Report</h3>

      <table>

        <thead>

          <tr>

            <th>S.No</th>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Remarks</th>
            <th>Balance</th>

          </tr>

        </thead>

        <tbody>

    `;

    rows.forEach((row, index) => {

      html += `

      <tr>

        <td>${index + 1}</td>

        <td>${row.date}</td>

        <td>${row.type}</td>

        <td>₹${Number(row.amount).toLocaleString("en-IN")}</td>

        <td>${row.remarks}</td>

        <td>₹${Number(row.closingBalance).toLocaleString("en-IN")}</td>

      </tr>

      `;

    });

    html += `

        </tbody>

      </table>

    </body>

    </html>

    `;

    const printWindow = window.open("", "", "width=1000,height=700");

    printWindow.document.write(html);

    printWindow.document.close();

    printWindow.focus();

    printWindow.print();

    printWindow.close();

  };

  return (

    <Box
      sx={{
        mt: 3,
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >

      <Typography
        variant="h6"
        fontWeight="bold"
      >
        Recent Transactions
      </Typography>

      <Box display="flex" gap={2}>

        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
        >
          Export
        </Button>

        <Button
          variant="outlined"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
        >
          Print
        </Button>

      </Box>

    </Box>

  );

}

export default TableHeader;