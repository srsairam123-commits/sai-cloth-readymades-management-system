import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import { login } from "../services/api";
import AppSnackbar from "../components/common/AppSnackbar";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const handleLogin = async () => {

    if (!username || !password) {

      setSnackbar({
        open: true,
        message: "Please enter Username and Password",
        severity: "warning",
      });

      return;

    }

    setLoading(true);

    const response = await login(username, password);

    setLoading(false);

    if (response.success) {

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      localStorage.setItem("role", response.role);

      navigate("/dashboard");

    } else {

      setSnackbar({
        open: true,
        message: response.message,
        severity: "error",
      });

    }

  };

  return (

    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background:
          "linear-gradient(135deg,#EEF2FF,#E0E7FF,#F8FAFC)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >

      <Card
        elevation={12}
        sx={{
          width: {
            xs: "100%",
            sm: 500,
          },
          maxWidth: 600,
          p: 4,
          borderRadius: 4,
        }}
      >

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 4,
          }}
        >

          <Box
            component="img"
            src={logo}
            alt="Sai Cloth & Readymades"
            sx={{
              width: 70,
              height: 70,
              objectFit: "contain",
              borderRadius: 2,
            }}
          />

          <Box>

            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: {
                  xs: "20px",
                  sm: "26px",
                },
                fontWeight: 700,
                color: "#1F2937",
                lineHeight: 1.2,
              }}
            >
              Sai Cloth & Readymades
            </Typography>

            <Typography
              sx={{
                fontSize: "14px",
                color: "#6B7280",
                fontWeight: 500,
              }}
            >
              Transaction Management Portal
            </Typography>

          </Box>

        </Box>

        <Typography
          align="center"
          variant="h6"
          mb={3}
        >
          Welcome Back
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormControlLabel
          control={<Checkbox />}
          label="Remember Me"
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          onClick={handleLogin}
          sx={{
            mt: 2,
            height: 50,
            borderRadius: 2,
          }}
        >
          {loading ? "Logging In..." : "LOGIN"}
        </Button>

        <Typography
          align="center"
          mt={4}
          color="gray"
        >
          Authorized Staff Only
        </Typography>

      </Card>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={handleSnackbarClose}
      />

    </Box>

  );

}

export default Login;