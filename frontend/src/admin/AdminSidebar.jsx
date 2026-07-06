import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import CampaignIcon from "@mui/icons-material/Campaign";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import PlaceIcon from "@mui/icons-material/Place";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LogoutIcon from "@mui/icons-material/Logout";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/admin",
  },
  {
    text: "Sessions",
    icon: <EventIcon />,
    path: "/admin/sessions",
  },
  {
    text: "Speakers",
    icon: <RecordVoiceOverIcon />,
    path: "/admin/speakers",
  },
  {
    text: "Announcements",
    icon: <CampaignIcon />,
    path: "/admin/announcements",
  },
  {
    text: "Gallery",
    icon: <PhotoLibraryIcon />,
    path: "/admin/gallery",
  },
  {
    text: "Venue Map",
    icon: <PlaceIcon />,
    path: "/admin/venue-map",
  },
  {
    text: "Feedback",
    icon: <FeedbackIcon />,
    path: "/admin/feedback",
  },
  {
    text: "Help & Support",
    icon: <SupportAgentIcon />,
    path: "/admin/help-support",
  },
];

function AdminSidebar() {

  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("organizerUser");

    navigate("/login", {
      replace: true,
    });

  };
  return (

    <Box
      sx={{
        width: 280,
        height: "100vh",
        bgcolor: "#263238",
        color: "white",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
      }}
    >

      <Box sx={{ p: 4 }}>

        <Typography
          variant="h5"
          fontWeight={700}
        >
          WISE CMS
        </Typography>

        <Typography color="#CFD8DC">
          Organizer Portal
        </Typography>

      </Box>

      <Divider sx={{ bgcolor: "#455A64" }} />

      <List
        sx={{
          flex: 1,
          px: 2,
          mt: 2,
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
              borderRadius: 2,

              "&.Mui-selected": {
                bgcolor: "#455A64",
              },

              "&:hover": {
                bgcolor: "#37474F",
              },
            }}
          >

            <ListItemIcon
              sx={{
                color: "white",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.text}
            />

          </ListItemButton>

        ))}

      </List>

      <Divider sx={{ bgcolor: "#455A64" }} />

      <List sx={{ p: 2 }}>

        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,

            "&:hover": {
              bgcolor: "#37474F",
            },
          }}
        >

          <ListItemIcon
            sx={{
              color: "white",
            }}
          >
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

export default AdminSidebar;