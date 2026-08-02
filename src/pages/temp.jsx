import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import TableHeader from "../components/dashboard/TableHeader";
import TransactionTable from "../components/dashboard/TransactionTable";
import LoadingOverlay from "../components/common/LoadingOverlay";

import { getTransactions } from "../services/api";

function Dashboard() {

  const [rows, setRows] = useState([]);
  const [allRows, setAllRows] = useState([]);

  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {

    setLoading(true);

    try {

      const response = await getTransactions();

      if (response.success) {

        setAllRows(response.transactions);
        setRows(response.transactions.slice(0, 10));

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  const handleSearch = () => {

    let data = [...allRows];

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

    setRows(data);

  };

  const handleReset = () => {

    setDate("");
    setType("");
    setRemarks("");

    setRows(allRows.slice(0, 10));

  };

  return (

    <Box
      sx={{
        display: "flex",
        bgcolor: "#F4F7FC",
        minHeight: "100vh",
      }}
    >

      {/* Loading Spinner */}
      <LoadingOverlay open={loading} />

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
          Dashboard
        </Typography>

        <DashboardSummary />

        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
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
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Received">Received</MenuItem>
              <MenuItem value="Sent">Sent</MenuItem>
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

          </Box>

        </Paper>

        <TableHeader />

        <TransactionTable rows={rows} />

      </Box>

    </Box>

  );

}

export default Dashboard;