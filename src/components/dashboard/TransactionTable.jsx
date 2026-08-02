import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

import { useState, useEffect } from "react";
import PaginationBar from "./PaginationBar";

function formatDate(dateValue) {

  if (!dateValue) return "";

  const date = new Date(dateValue);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

}

function TransactionTable({ rows = [] }) {

  const [page, setPage] = useState(1);

  const rowsPerPage = 10;

  useEffect(() => {
    setPage(1);
  }, [rows]);

  return (
    <>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 4,
          boxShadow: "0 5px 18px rgba(0,0,0,.08)",
        }}
      >

        <Table
          sx={{
            "& th": {
              textAlign: "center",
              fontWeight: "bold",
            },
            "& td": {
              textAlign: "center",
            },
          }}
        >

          <TableHead>

            <TableRow sx={{ background: "#EEF2FF" }}>

              <TableCell>S.No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Balance</TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {rows.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={6}
                  align="center"
                >
                  No Transactions Found
                </TableCell>

              </TableRow>

            ) : (

              rows
                .slice(
                  (page - 1) * rowsPerPage,
                  page * rowsPerPage
                )
                .map((row, index) => (

                  <TableRow
                    key={index}
                    hover
                    sx={{
                      backgroundColor:
                        index % 2 === 0
                          ? "#FFFFFF"
                          : "#F9FAFB",

                      "&:hover": {
                        backgroundColor: "#EEF2FF",
                      },
                    }}
                  >

                    <TableCell>
                      {(page - 1) * rowsPerPage + index + 1}
                    </TableCell>

                    <TableCell>
                      {formatDate(row.date)}
                    </TableCell>

                    <TableCell>

                      <Chip
                        label={row.type}
                        color={
                          row.type === "Received"
                            ? "success"
                            : "error"
                        }
                      />

                    </TableCell>

                    <TableCell align="right">
                      ₹{Number(row.amount).toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell>
                      {row.remarks}
                    </TableCell>

                    <TableCell align="right">
                      ₹{Number(row.closingBalance).toLocaleString("en-IN")}
                    </TableCell>

                  </TableRow>

                ))

            )}

          </TableBody>

        </Table>

      </TableContainer>

      <PaginationBar
        page={page}
        totalRows={rows.length}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
      />

    </>
  );

}

export default TransactionTable;