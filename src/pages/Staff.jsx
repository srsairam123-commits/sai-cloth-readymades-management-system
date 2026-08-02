import { useEffect, useState } from "react";
import AddStaffDialog from "../components/dialogs/AddStaffDialog";
import {
  Box,
  Toolbar,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import { getUsers } from "../services/api";

function Staff() {

  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {

    const response = await getUsers();

    if (response.success) {
      setUsers(response.users);
    }

  }
  function handleEdit(user) {

  setSelectedUser(user);

  setOpen(true);

}

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
          Staff Management
        </Typography>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >

            <Typography variant="h6">
              Staff List
            </Typography>

            <Button
  variant="contained"
  startIcon={<PersonAddIcon />}
  onClick={() => {
    setSelectedUser(null);
    setOpen(true);
  }}
>
  Add Staff
</Button>

          </Box>

          <TableContainer>

            <Table>

              <TableHead>

                <TableRow>

                  <TableCell align="center">
                    <b>Name</b>
                  </TableCell>

                  <TableCell align="center">
                    <b>Username</b>
                  </TableCell>

                  <TableCell align="center">
                    <b>Role</b>
                  </TableCell>

                  <TableCell align="center">
                    <b>Status</b>
                  </TableCell>

                  <TableCell align="center">
                    <b>Action</b>
                  </TableCell>

                </TableRow>

              </TableHead>

              <TableBody>

                {users.map((user, index) => (

                  <TableRow key={index} hover>

                    <TableCell align="center">
                      {user.name}
                    </TableCell>

                    <TableCell align="center">
                      {user.username}
                    </TableCell>

                    <TableCell align="center">
                      {user.role}
                    </TableCell>

                    <TableCell align="center">

                      <Chip
                        label={user.status}
                        color={
                          user.status === "Active"
                            ? "success"
                            : "error"
                        }
                      />

                    </TableCell>

                    <TableCell align="center">

                      <Button
  variant="outlined"
  size="small"
  startIcon={<EditIcon />}
  onClick={() => handleEdit(user)}
>
  Edit
</Button>

                    </TableCell>

                  </TableRow>

                ))}

              </TableBody>

            </Table>

          </TableContainer>

        </Paper>
        <AddStaffDialog
  open={open}
  handleClose={() => {
    setOpen(false);
    setSelectedUser(null);
  }}
  loadUsers={loadUsers}
  selectedUser={selectedUser}
/>
      </Box>

    </Box>
    
  );
}

export default Staff;