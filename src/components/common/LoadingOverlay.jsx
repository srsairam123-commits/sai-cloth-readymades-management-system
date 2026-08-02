import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";

function LoadingOverlay({ open }) {
  return (
    <Backdrop
      open={open}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 100,
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
    >
      <Box textAlign="center">
        <CircularProgress color="inherit" />
        <Typography mt={2}>
          Please wait...
        </Typography>
      </Box>
    </Backdrop>
  );
}

export default LoadingOverlay;