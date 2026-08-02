import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import DashboardSummary from "../components/dashboard/DashboardSummary";

function Reports() {
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
          Reports
        </Typography>

        <DashboardSummary />

        <Box mt={4} display="flex" gap={2}>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
          >
            Export Excel
          </Button>

          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
          >
            Print Report
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Reports;