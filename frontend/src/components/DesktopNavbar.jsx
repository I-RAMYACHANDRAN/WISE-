import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CampaignIcon from "@mui/icons-material/Campaign";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import PlaceIcon from "@mui/icons-material/Place";
import CollectionsIcon from "@mui/icons-material/Collections";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import wiseLogo from "../assets/images/wise-logo.png";

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    text: "Agenda",
    icon: <EventNoteIcon />,
    path: "/agenda",
  },
  {
    text: "My Schedule",
    icon: <CalendarMonthIcon />,
    path: "/myschedule",
  },
  {
    text: "Speakers",
    icon: <RecordVoiceOverIcon />,
    path: "/speakers",
  },
  {
    text: "Venue",
    icon: <PlaceIcon />,
    path: "/venue",
  },
  {
    text: "Announcements",
    icon: <CampaignIcon />,
    path: "/announcements",
  },
  {
    text: "Gallery",
    icon: <CollectionsIcon />,
    path: "/gallery",
  },

  {
    text: "Profile",
    icon: <PersonIcon />,
    path: "/profile",
  },
  {
  text: "Help & Support",
  icon: <SupportAgentIcon />,
  path: "/help-support",
},
];
const handleLogout = () => {

  alert("Logout clicked");

  localStorage.removeItem("attendeeUser");

  window.location.href = "/login";

};

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        bgcolor: "#FFFFFF",
        borderRight: "1px solid #ECECEC",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      {/* Logo Section */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 3,
          py: 3,
        }}
      >
        <Box
          component="img"
          src={wiseLogo}
          alt="WISE Connect"
          sx={{
            width: 60,
            height: 60,
            objectFit: "contain",
          }}
        />

        <Box>
          <Typography
            variant="h6"
            fontWeight={700}
            color="#6C3EF4"
            sx={{ lineHeight: 1.1 }}
          >
            WISE Connect
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Women in Science &
            <br />
            Engineering
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Navigation */}

      <List
        sx={{
          mt: 2,
          px: 2,
          flex: 1,
        }}
      >
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              mb: 1,
              borderRadius: 3,
              py: 1.2,

              "&.Mui-selected": {
                bgcolor: "#F1ECFF",
                color: "#6C3EF4",

                "& .MuiListItemIcon-root": {
                  color: "#6C3EF4",
                },
              },

              "&:hover": {
                bgcolor: "#F7F4FF",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight:
                  location.pathname === item.path
                    ? 700
                    : 500,
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      {/* Logout */}

      <List sx={{ p: 2 }}>
      <ListItemButton
        onClick={handleLogout}
        sx={{
          borderRadius: 3,

          "&:hover": {
            bgcolor: "#FFF2F2",
          },
        }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>

        <ListItemText
          primary="Logout"
        />

      </ListItemButton>
    </List>
    </Box>
  );
}

export default Navbar;