import { useState } from "react";

import {
  Box,
  Toolbar,
  Typography,
  Paper,
  TextField,
  Grid,
  Button,
} from "@mui/material";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import { changePassword } from "../services/api";
import { getSettings, saveSettings } from "../services/api";
import { useEffect } from "react";

function Settings() {

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [settings, setSettings] = useState({
  shopName: "",
  ownerName: "",
  mobile: "",
  email: "",
  bankName: "",
  accountHolder: "",
  accountNumber: "",
  ifsc: "",
  upi: "",
});
useEffect(() => {
  loadSettings();
}, []);

const loadSettings = async () => {

  const response = await getSettings();

  if (response.success) {
    setSettings({
      shopName: response.settings.shopName || "",
      ownerName: response.settings.ownerName || "",
      mobile: response.settings.mobile || "",
      email: response.settings.email || "",
      bankName: response.settings.bankName || "",
      accountHolder: response.settings.accountHolder || "",
      accountNumber: response.settings.accountNumber || "",
      ifsc: response.settings.ifsc || "",
      upi: response.settings.upi || "",
    });
  }

};
const handleSaveSettings = async () => {

  const response = await saveSettings(settings);

  alert(response.message);

};
  const handleSettingsChange = (e) => {

  setSettings({
    ...settings,
    [e.target.name]: e.target.value,
  });

};

  const handlePasswordChange = (e) => {

    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });

  };

  const savePassword = async () => {

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {

      alert("Please fill all fields.");
      return;

    }

    if (passwordForm.newPassword.length < 6) {

      alert("Password must contain at least 6 characters.");
      return;

    }

    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {

      alert("New Password and Confirm Password do not match.");
      return;

    }

    const response = await changePassword(passwordForm);

    alert(response.message);

    if (response.success) {

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    }

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
          Settings
        </Typography>

        {/* Business Information */}

        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
          }}
        >

          <Typography variant="h6" mb={2}>
            Business Information
          </Typography>

          <Grid container spacing={2}>

            <Grid item xs={12} md={6}>
              <TextField
  fullWidth
  label="Shop Name"
  name="shopName"
  value={settings.shopName}
  onChange={handleSettingsChange}
/>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Owner Name"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mobile Number"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
  variant="contained"
  onClick={handleSaveSettings}
>
  Save Settings
</Button>
            </Grid>

          </Grid>

        </Paper>

        {/* Bank Details */}

        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
          }}
        >

          <Typography variant="h6" mb={2}>
            Bank Details
          </Typography>

          <Grid container spacing={2}>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Bank Name"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Account Holder"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Account Number"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="IFSC Code"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="UPI ID"
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained">
                Save Bank Details
              </Button>
            </Grid>

          </Grid>

        </Paper>

        {/* Change Password */}

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >

          <Typography variant="h6" mb={2}>
            Change Password
          </Typography>

          <Grid container spacing={2}>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
              />
            </Grid>

            <Grid item xs={12}>

              <Button
                variant="contained"
                color="warning"
                onClick={savePassword}
              >
                Change Password
              </Button>

            </Grid>

          </Grid>

        </Paper>

      </Box>

    </Box>

  );

}

export default Settings;