import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddIcon from "@mui/icons-material/Add";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import TransactionTable from "../components/dashboard/TransactionTable";
import AddTransactionDialog from "../components/dialogs/AddTransactionDialog";

import { useState, useEffect } from "react";
import { getTransactions } from "../services/api";

function Transactions() {

  const role = localStorage.getItem("role");

  const [open, setOpen] = useState(false);

  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [remarks, setRemarks] = useState("");

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {

    const response = await getTransactions();

    if (response.success) {

      setTransactions(response.transactions);
      setFilteredTransactions(response.transactions);

    }

  }

  const handleSearch = () => {

    let data = [...transactions];

    if (date) {

  data = data.filter((item) => {

    const d = new Date(item.date);

    const itemDate =
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0");

    return itemDate === date;

  });

}

    if (type) {

      data = data.filter(
        (item) => item.type === type
      );

    }

    if (remarks) {

      data = data.filter((item) =>
        item.remarks
          .toLowerCase()
          .includes(remarks.toLowerCase())
      );

    }

    setFilteredTransactions(data);

  };

  const handleReset = () => {

    setDate("");
    setType("");
    setRemarks("");

    setFilteredTransactions(transactions);

  };

  const handleDialogClose = () => {

    setOpen(false);

    loadTransactions();

  };

  return (

    <Box sx={{ display: "flex", bgcolor: "#F4F7FC" }}>

      <Navbar />
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >

        <Toolbar />

        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
        >
          Transaction History
        </Typography>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            mb: 3,
          }}
        >

          <Box
            display="flex"
            gap={2}
            flexWrap="wrap"
          >

            <TextField
              type="date"
              size="small"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <TextField
              select
              label="Type"
              size="small"
              value={type}
              onChange={(e) => setType(e.target.value)}
              sx={{ minWidth: 170 }}
            >
              <MenuItem value="">
                All
              </MenuItem>

              <MenuItem value="Received">
                Received
              </MenuItem>

              <MenuItem value="Sent">
                Sent
              </MenuItem>

            </TextField>

            <TextField
              placeholder="Search Remarks"
              size="small"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              sx={{ flex: 1 }}
            />

            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
            >
              Search
            </Button>

            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={handleReset}
            >
              Reset
            </Button>

            {role === "Admin" && (

              <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
              >
                Add Transaction
              </Button>

            )}

          </Box>

        </Paper>

        <TransactionTable
          rows={filteredTransactions}
        />

      </Box>

      <AddTransactionDialog
        open={open}
        handleClose={handleDialogClose}
      />

    </Box>

  );

}

export default Transactions;