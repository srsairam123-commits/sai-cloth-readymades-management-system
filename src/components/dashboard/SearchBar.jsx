import {
  Box,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function SearchBar() {
  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
      }}
    >
      <TextField
        type="date"
        size="small"
        sx={{ minWidth: 180 }}
      />

      <TextField
        select
        label="Type"
        size="small"
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Received">Received</MenuItem>
        <MenuItem value="Sent">Sent</MenuItem>
      </TextField>

      <TextField
        placeholder="Search Remarks"
        size="small"
        sx={{
          flex: 1,
          minWidth: 250,
        }}
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
  );
}

export default SearchBar;