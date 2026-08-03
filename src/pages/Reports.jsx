import { useState } from "react";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import LoadingOverlay from "../components/common/LoadingOverlay";

function Reports() {

  const [loading, setLoading] = useState(false);

  const handleExport = async () => {

    setLoading(true);

    try {

      // TODO: Add Excel Export Logic Here

      await new Promise((resolve) => setTimeout(resolve, 1500));

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const handlePrint = async () => {

    setLoading(true);

    try {

      await new Promise((resolve) => setTimeout(resolve, 500));

      window.print();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <Box
      sx={{
        display: "flex",
        bgcolor: "#F4F7FC",
        minHeight: "100vh",
      }}
    >

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
          Reports
        </Typography>

        <DashboardSummary />

        <Box
          mt={4}
          display="flex"
          gap={2}
          flexWrap="wrap"
        >

          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
          >
            Export Excel
          </Button>

          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
          >
            Print Report
          </Button>

        </Box>

      </Box>

    </Box>

  );

}

export default Reports;