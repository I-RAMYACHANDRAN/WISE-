import { useEffect, useState } from "react";

import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

import AnnouncementCard from "../components/announcement/AnnouncementCard";

import {
  getAnnouncements,
  markAnnouncementsViewed,
} from "../services/announcementService";

import { getProfile } from "../services/authService";

function Announcements() {

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {

    try {

      const loggedInUser = JSON.parse(
        localStorage.getItem("attendeeUser")
      );

      if (!loggedInUser) return;

      // Get the user's last viewed timestamp
      const profile = await getProfile(
        loggedInUser._id
      );

      const lastViewed =
        profile.user.lastAnnouncementViewedAt;

      // Load announcements
      const data = await getAnnouncements();

      // Identify new announcements
      const formattedAnnouncements = data.map(
        (announcement) => ({
          ...announcement,
          isNew:
            lastViewed &&
            new Date(announcement.createdAt) >
              new Date(lastViewed),
        })
      );

      setAnnouncements(formattedAnnouncements);

    } catch (error) {

      console.error(
        "Error loading announcements:",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  // Mark announcements as viewed after they are displayed
  useEffect(() => {

    if (loading) return;

    const updateViewed = async () => {

      try {

        const loggedInUser = JSON.parse(
          localStorage.getItem("attendeeUser")
        );

        if (!loggedInUser) return;

        await markAnnouncementsViewed(
          loggedInUser._id
        );

      } catch (error) {

        console.error(error);

      }

    };

    updateViewed();

  }, [loading]);

  return (

    <Box>

      {loading ? (

        <Box
          sx={{
            textAlign: "center",
            mt: 6,
          }}
        >
          <CircularProgress />
        </Box>

      ) : announcements.length === 0 ? (

        <Typography
          align="center"
          color="text.secondary"
          sx={{ mt: 6 }}
        >
          No announcements available.
        </Typography>

      ) : (

        announcements.map((announcement) => (

          <AnnouncementCard
            key={announcement._id}
            announcement={announcement}
            isNew={announcement.isNew}
          />

        ))

      )}

    </Box>

  );

}

export default Announcements;