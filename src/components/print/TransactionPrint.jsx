import React from "react";

const TransactionPrint = React.forwardRef(({ transactions }, ref) => {

  return (
    <div ref={ref} style={{ padding: 20 }}>

      <h2 style={{ textAlign: "center" }}>
        Sai Cloth & Readymades
      </h2>

      <h4 style={{ textAlign: "center" }}>
        Transaction Report
      </h4>

      <table
        border="1"
        cellPadding="8"
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >
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

          {transactions.map((row, index) => (

            <tr key={index}>

              <td>{index + 1}</td>
              <td>{row.date}</td>
              <td>{row.type}</td>
              <td>₹{row.amount}</td>
              <td>{row.remarks}</td>
              <td>₹{row.closingBalance}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );

});

export default TransactionPrint;