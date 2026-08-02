import {
  Box,
  TextField,
  MenuItem,
  Button,
  Paper,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function FilterSection() {
  return (
    <Paper
      elevation={2}
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
          label="From Date"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="To Date"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          select
          label="Type"
          size="small"
          sx={{ minWidth: 170 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Received">Received</MenuItem>
          <MenuItem value="Sent">Sent</MenuItem>
        </TextField>

        <TextField
          label="Search"
          placeholder="Remarks / Amount"
          size="small"
          sx={{ flex: 1 }}
        />

        <Button
          variant="contained"
          startIcon={<SearchIcon />}
        >
          Search
        </Button>

        <Button
          variant="outlined"
          startIcon={<RestartAltIcon />}
        >
          Reset
        </Button>
      </Box>
    </Paper>
  );
}

export default FilterSection;