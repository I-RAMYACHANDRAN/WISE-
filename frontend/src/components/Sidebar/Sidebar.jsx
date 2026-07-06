import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CampaignIcon from "@mui/icons-material/Campaign";
import FeedbackIcon from "@mui/icons-material/Feedback";
import PersonIcon from "@mui/icons-material/Person";

import { Link, useLocation } from "react-router-dom";

import wiseLogo from "../../assets/images/wise-logo.png";

const drawerWidth = 260;

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    text: "Agenda",
    icon: <EventIcon />,
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
    icon: <LocationOnIcon />,
    path: "/venue",
  },
  {
    text: "Gallery",
    icon: <PhotoLibraryIcon />,
    path: "/gallery",
  },
  {
    text: "Announcements",
    icon: <CampaignIcon />,
    path: "/announcements",
  },
  {
    text: "Feedback",
    icon: <FeedbackIcon />,
    path: "/feedback",
  },
  {
    text: "Profile",
    icon: <PersonIcon />,
    path: "/profile",
  },
];

function Sidebar() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid #E5E7EB",
          bgcolor: "#FAFAFA",
        },
      }}
    >
      <Toolbar />

      {/* Logo Section */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 3,
          py: 2,
          borderBottom: "1px solid #ECECEC",
        }}
      >
        <Box
          component="img"
          src={wiseLogo}
          alt="WISE Connect"
          sx={{
            width: 52,
            height: 52,
            objectFit: "contain",
          }}
        />

        <Box>
          <Typography
            variant="h6"
            fontWeight={700}
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

      {/* Menu */}

      <List sx={{ mt: 2 }}>

        {menuItems.map((item) => (

          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              mx: 1.5,
              mb: 0.5,
              borderRadius: 2,

              "&.Mui-selected": {
                bgcolor: "#E8EAF6",
              },

              "&.Mui-selected:hover": {
                bgcolor: "#DDE3FD",
              },
            }}
          >

            <ListItemIcon
              sx={{
                color: location.pathname === item.path
                  ? "#3F51B5"
                  : "#616161",
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

    </Drawer>
  );
}

export default Sidebar;