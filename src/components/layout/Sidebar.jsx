import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

function Sidebar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

const handleLogout = () => {

  localStorage.clear();

  navigate("/");

};
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          top: "64px",
          height: "calc(100% - 64px)",
}
      }}
    >
      <List>
        <ListItemButton
  component={Link}
  to="/dashboard"
>

  <ListItemIcon>
    <DashboardIcon color="primary" />
  </ListItemIcon>

  <ListItemText primary="Dashboard" />

</ListItemButton>

        <ListItemButton
component={Link}
to="/transactions"
>

<ListItemIcon>

<ReceiptLongIcon color="primary"/>

</ListItemIcon>

<ListItemText
primary="Transactions"
/>

</ListItemButton>

        <ListItemButton
component={Link}
to="/reports"
>

<ListItemIcon>
<AssessmentIcon color="primary"/>
</ListItemIcon>

<ListItemText
primary="Reports"
/>

</ListItemButton>

        {role === "Admin" && (

<ListItemButton component={Link} to="/staff">

  <ListItemIcon>
    <PeopleIcon />
  </ListItemIcon>

  <ListItemText primary="Staff" />

</ListItemButton>

)}
        <ListItemButton component={Link} to="/settings">

    <ListItemIcon>
        <SettingsIcon />
    </ListItemIcon>

    <ListItemText primary="Settings"/>

</ListItemButton>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default Sidebar;