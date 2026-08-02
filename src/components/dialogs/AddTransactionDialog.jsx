import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";

import { useState, useEffect } from "react";

import { addTransaction } from "../../services/api";
import AppSnackbar from "../common/AppSnackbar";

function AddTransactionDialog({ open, handleClose }) {

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [form, setForm] = useState({
    date: "",
    type: "Received",
    amount: "",
    remarks: "",
  });

  useEffect(() => {

    if (open) {

      setForm({
        date: "",
        type: "Received",
        amount: "",
        remarks: "",
      });

    }

  }, [open]);

  const handleSnackbarClose = () => {

    setSnackbar({
      ...snackbar,
      open: false,
    });

  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSave = async () => {

    if (
      !form.date ||
      !form.type ||
      !form.amount ||
      !form.remarks
    ) {

      setSnackbar({
        open: true,
        message: "Please fill all mandatory fields.",
        severity: "warning",
      });

      return;

    }

    setLoading(true);

    const response = await addTransaction(form);

    setLoading(false);

    if (response.success) {

      setSnackbar({
        open: true,
        message: response.message,
        severity: "success",
      });

      setForm({
        date: "",
        type: "Received",
        amount: "",
        remarks: "",
      });

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
          Add Transaction
        </DialogTitle>

        <DialogContent>

          <Grid container spacing={2} mt={1}>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                name="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={form.date}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Type"
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <MenuItem value="Received">
                  Received
                </MenuItem>

                <MenuItem value="Sent">
                  Sent
                </MenuItem>

              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Remarks"
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
              />
            </Grid>

          </Grid>

        </DialogContent>

        <DialogActions>

          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={loading}
            onClick={handleSave}
          >
            {loading ? "Saving..." : "Save"}
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

export default AddTransactionDialog;