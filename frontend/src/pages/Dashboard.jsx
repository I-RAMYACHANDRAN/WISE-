import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import NextSessionCard from "../components/NextSessionCard";
import AnnouncementCard from "../components/announcement/AnnouncementCard";

import { getAnnouncements } from "../services/announcementService";
import { getSessions } from "../services/sessionService";
import { getSpeakers } from "../services/speakerService";

function Dashboard() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [announcements, setAnnouncements] = useState([]);

  const [sessions, setSessions] = useState([]);

  const [speakers, setSpeakers] = useState([]);

  const user = JSON.parse(localStorage.getItem("attendeeUser"));

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const [

        announcementData,

        sessionData,

        speakerData,

      ] = await Promise.all([

        getAnnouncements(),

        getSessions(),

        getSpeakers(),

      ]);

      setAnnouncements(
        announcementData.slice(0, 3)
      );

      setSessions(sessionData);

      setSpeakers(speakerData);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const totalSessions = sessions.length;

  // Updated registration count
  const registeredSessions = sessions.filter(
    (session) =>
      session.attendees?.some(
        (attendee) =>
          String(attendee.attendeeId) ===
          String(user?._id)
      )
  ).length;

  return (

    <Box sx={{ p: 4 }}>

      {/* Welcome */}

      <Box sx={{ mb: 5 }}>

        <Typography
          variant="h4"
          fontWeight={700}
        >
          Welcome {user?.name} 👋
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Women in Science & Engineering Conference 2026
        </Typography>

      </Box>

      {/* Next Session */}

      <NextSessionCard />

      {/* Latest Announcements */}

      <Box sx={{ mt: 6 }}>

        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
        >
          📢 Latest Announcements
        </Typography>

        {loading ? (

          <Box
            sx={{
              textAlign: "center",
              py: 4,
            }}
          >
            <CircularProgress />
          </Box>

        ) : announcements.length === 0 ? (

          <Typography color="text.secondary">
            No announcements available.
          </Typography>

        ) : (

          announcements.map((announcement) => (

            <AnnouncementCard
              key={announcement._id}
              announcement={announcement}
            />

          ))

        )}

        <Button
          sx={{ mt: 2 }}
          onClick={() =>
            navigate("/announcements")
          }
        >
          View All Announcements →
        </Button>

      </Box>

      {/* Conference Information */}

      <Box sx={{ mt: 6 }}>

        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
        >
          📅 Conference Information
        </Typography>

        <Grid
          container
          spacing={3}
        >

          {/* Conference Date */}

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
          >

            <Card
              sx={{
                height: 170,
                borderRadius: 4,
                bgcolor: "#E3F2FD",
                display: "flex",
              }}
            >

              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >

                <Typography
                  color="text.secondary"
                  fontWeight={600}
                >
                  Conference Date
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={700}
                >
                  15 Sept 2026
                </Typography>

              </CardContent>

            </Card>

          </Grid>

          {/* Venue */}

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
          >

            <Card
              sx={{
                height: 170,
                borderRadius: 4,
                bgcolor: "#E8F5E9",
                display: "flex",
              }}
            >

              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >

                <Typography
                  color="text.secondary"
                  fontWeight={600}
                >
                  Venue
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={700}
                  align="center"
                >
                  GE Vernova
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  Bengaluru
                </Typography>

              </CardContent>

            </Card>

          </Grid>

          {/* Total Sessions */}

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
          >

            <Card
              sx={{
                height: 170,
                borderRadius: 4,
                bgcolor: "#F3E5F5",
                display: "flex",
              }}
            >

              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >

                <Typography
                  color="text.secondary"
                  fontWeight={600}
                >
                  Total Sessions
                </Typography>

                <Typography
                  variant="h2"
                  fontWeight={700}
                  color="primary"
                >
                  {totalSessions}
                </Typography>

              </CardContent>

            </Card>

          </Grid>

          {/* Registered Sessions */}

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
          >

            <Card
              sx={{
                height: 170,
                borderRadius: 4,
                bgcolor: "#FFF3E0",
                display: "flex",
              }}
            >

              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >

                <Typography
                  color="text.secondary"
                  fontWeight={600}
                  align="center"
                >
                  Registered Sessions
                </Typography>

                <Typography
                  variant="h2"
                  fontWeight={700}
                  color="success.main"
                >
                  {registeredSessions}
                </Typography>

              </CardContent>

            </Card>

          </Grid>

        </Grid>

      </Box>

    </Box>

  );

}

export default Dashboard;