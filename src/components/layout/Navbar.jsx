import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import logo from "../../assets/logo.png";

function Navbar() {
  return (
    <AppBar
  position="fixed"
  elevation={1}
  sx={{
    backgroundColor: "#fff",
    color: "#1F2937",
    borderBottom: "1px solid #E5E7EB",
    zIndex: (theme) => theme.zIndex.drawer + 1,
  }}
>
      <Toolbar>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
          }}
        >

          <Box
            component="img"
            src={logo}
            sx={{
              width: 45,
              height: 45,
              mr: 2,
              borderRadius: 2,
            }}
          />

          <Box>

            <Typography
              fontWeight="bold"
              sx={{
                fontSize:{
                  xs:16,
                  md:20
                }
              }}
            >
              Sai Cloth & Readymades
            </Typography>

            <Typography
              variant="caption"
              color="gray"
              sx={{
                fontSize: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
                }
              }}
            >
              Transaction Management Portal
            </Typography>

          </Box>

        </Box>

        <NotificationsIcon sx={{mr:3}}/>

        <Avatar
        sx={{
          bgcolor:"#4F46E5"
        }}
        >
          A
        </Avatar>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;