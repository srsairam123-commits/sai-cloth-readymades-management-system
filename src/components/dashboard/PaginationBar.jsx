import {
  Box,
  Pagination,
  Typography,
} from "@mui/material";

function PaginationBar({
  page,
  totalRows,
  rowsPerPage,
  onPageChange,
}) {

  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const start =
    totalRows === 0
      ? 0
      : (page - 1) * rowsPerPage + 1;

  const end = Math.min(
    page * rowsPerPage,
    totalRows
  );

  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Typography fontWeight={500}>
        Showing {start}-{end} of {totalRows} Transactions
      </Typography>

      <Pagination
        page={page}
        count={totalPages}
        color="primary"
        onChange={(event, value) =>
          onPageChange(value)
        }
      />
    </Box>
  );
}

export default PaginationBar;