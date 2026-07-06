import { useEffect, useState } from "react";
import { useNotifications } from "../context/NotificationContext";

import {
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
  IconButton,
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import { useNavigate } from "react-router-dom";

import { getProfile } from "../services/authService";
import { API_BASE_URL } from "../config/api";

const BASE_URL = API_BASE_URL.replace("/api", "");


function TopBar({
  title,
  subtitle,
}) {

  const navigate = useNavigate();

  const {
  notificationCount,
  refreshNotifications,
      } = useNotifications();

  const [user, setUser] = useState(null);


  const [anchorEl, setAnchorEl] =
    useState(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {

    try {

      const loggedInUser = JSON.parse(
        localStorage.getItem("attendeeUser")
      );

      if (!loggedInUser) return;

      // Load profile
      const profileResponse =
        await getProfile(loggedInUser._id);

      setUser(profileResponse.user);

      // Load unread notification count
      await refreshNotifications();
      

    } catch (error) {

      console.error(error);

    }

  };

  const handleMenuOpen = (event) => {

    setAnchorEl(event.currentTarget);

  };

  const handleMenuClose = () => {

    setAnchorEl(null);

  };

  const handleProfile = () => {

    handleMenuClose();

    navigate("/profile");

  };

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/login");

  };

  const handleNotificationClick = () => {

    navigate("/announcements");

  };

  return (

    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 5,
      }}
    >

      {/* Left */}

      <Box>

        <Typography
          variant="h4"
          fontWeight={700}
        >
          {title}
        </Typography>

        <Typography
          color="text.secondary"
          mt={0.5}
        >
          {subtitle}
        </Typography>

      </Box>

      {/* Right */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >

        {/* Notification */}

        <IconButton
          onClick={handleNotificationClick}
        >

          <Badge
            badgeContent={notificationCount}
            color="error"
          >

            <NotificationsNoneIcon
              fontSize="medium"
            />

          </Badge>

        </IconButton>

        {/* Avatar */}

        <Avatar
          src={
            user?.profileImage
              ? `${BASE_URL}/${user.profileImage}`
              : ""
          }
          sx={{
            width: 46,
            height: 46,
            bgcolor: "#6C3EF4",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 20,
          }}
          onClick={handleMenuOpen}
        >

          {!user?.profileImage &&
            user?.name
              ?.charAt(0)
              .toUpperCase()}

        </Avatar>

        {/* Avatar Menu */}

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >

          <MenuItem
            onClick={handleProfile}
          >
            View Profile
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={handleLogout}
          >
            Logout
          </MenuItem>

        </Menu>

      </Box>

    </Box>

  );

}

export default TopBar;