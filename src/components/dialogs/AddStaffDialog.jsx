import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

import { useState, useEffect } from "react";

import { addUser, updateUser } from "../../services/api";
import AppSnackbar from "../common/AppSnackbar";

function AddStaffDialog({
  open,
  handleClose,
  loadUsers,
  selectedUser,
}) {

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    role: "Staff",
    status: "Active",
  });

  useEffect(() => {

    if (selectedUser) {

      setForm({
        name: selectedUser.name,
        username: selectedUser.username,
        password: "",
        role: selectedUser.role,
        status: selectedUser.status,
      });

    } else {

      setForm({
        name: "",
        username: "",
        password: "",
        role: "Staff",
        status: "Active",
      });

    }

  }, [selectedUser, open]);

  const handleSnackbarClose = () => {

    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));

  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSave = async () => {

    if (!form.name || !form.username) {

      setSnackbar({
        open: true,
        message: "Please fill all mandatory fields.",
        severity: "warning",
      });

      return;

    }

    setLoading(true);

    let response;

    if (selectedUser) {

      response = await updateUser(form);

    } else {

      response = await addUser(form);

    }

    setLoading(false);

    if (response.success) {

      setSnackbar({
        open: true,
        message: response.message,
        severity: "success",
      });

      await loadUsers();

      handleClose();

    } else {

      setSnackbar({
        open: true,
        message: response.message,
        severity: "error",
      });

    }

  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >

        <DialogTitle>
          {selectedUser ? "Edit Staff" : "Add Staff"}
        </DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            InputProps={{
              readOnly: !!selectedUser,
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <TextField
            select
            fullWidth
            margin="normal"
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <MenuItem value="Admin">
              Admin
            </MenuItem>

            <MenuItem value="Staff">
              Staff
            </MenuItem>

          </TextField>

          <TextField
            select
            fullWidth
            margin="normal"
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <MenuItem value="Active">
              Active
            </MenuItem>

            <MenuItem value="Inactive">
              Inactive
            </MenuItem>

          </TextField>

        </DialogContent>

        <DialogActions>

          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
          >
            {loading
              ? (selectedUser ? "Updating..." : "Saving...")
              : (selectedUser ? "Update" : "Save")}
          </Button>

        </DialogActions>

      </Dialog>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={handleSnackbarClose}
      />
    </>
  );

}

export default AddStaffDialog;