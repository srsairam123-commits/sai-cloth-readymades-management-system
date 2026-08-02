import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Toolbar from "@mui/material/Toolbar";

function AddTransaction() {
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
          Add New Transaction
        </Typography>

        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          <Grid container spacing={3}>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Type"
                defaultValue="Received"
              >
                <MenuItem value="Received">Received</MenuItem>
                <MenuItem value="Sent">Sent</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Amount"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Remarks"
              />
            </Grid>

          </Grid>

          <Box
            mt={4}
            display="flex"
            gap={2}
          >
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Save Transaction
            </Button>

            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
            >
              Reset
            </Button>
          </Box>

        </Paper>

      </Box>
    </Box>
  );
}

export default AddTransaction;