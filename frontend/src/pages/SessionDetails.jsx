import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  Paper,
  Link,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import {
  useNavigate,
  useParams,
  Link as RouterLink,
} from "react-router-dom";

import {
  getSessions,
  registerSession,
} from "../services/sessionService";

function SessionDetails() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [session, setSession] = useState(null);

  useEffect(() => {

    loadSession();

  }, []);

  const loadSession = async () => {

    try {

      const sessions = await getSessions();

      const selected = sessions.find(
        (item) => item._id === id
      );

      setSession(selected);

    } catch (error) {

      console.error(error);

    }

  };

  const handleRegister = async () => {

  try {

    const user = JSON.parse(
      localStorage.getItem("attendeeUser")
    );

    await registerSession(
      session._id,
      {
        attendeeId: user._id,
        attendeeName: user.name,
      }
    );

    alert("Successfully Registered!");

    loadSession();

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      error.message
    );

  }

};

  if (!session) {

    return (

      <Typography sx={{ p: 5 }}>
        Loading...
      </Typography>

    );

  }

  return (

    <Box>

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/agenda")}
        sx={{ mb: 3 }}
      >
        Back to Agenda
      </Button>

      <Typography
        variant="h3"
        fontWeight={700}
      >
        {session.title}
      </Typography>

      <Typography
        color="primary"
        fontWeight={600}
        mt={1}
      >
        {session.type}
      </Typography>

      <Stack
        direction="row"
        spacing={5}
        mt={4}
        flexWrap="wrap"
      >

        {/* Date */}

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >

          <CalendarMonthIcon />

          <Typography>
            {session.date}
          </Typography>

        </Stack>

        {/* Time */}

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >

          <AccessTimeIcon />

          <Typography>
            {session.startTime} - {session.endTime}
          </Typography>

        </Stack>

        {/* Venue */}

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >

          <PlaceIcon />

          <Link
            component={RouterLink}
            to="/venue"
            underline="hover"
            sx={{
              fontWeight: 600,
              fontSize: "1rem",
              color: "primary.main",
            }}
          >
            {session.venue}
          </Link>

        </Stack>

        {/* Speaker */}

       {/* Speaker(s) */}

      <Stack spacing={1}>

        {session.speakers?.map((speaker) => (

          <Stack
            key={speaker.speakerId}
            direction="row"
            spacing={1}
            alignItems="center"
          >

            <PersonIcon />

            <Link
              component={RouterLink}
              to={`/speaker/${speaker.speakerId}`}
              underline="hover"
              sx={{
                fontWeight: 600,
                fontSize: "1rem",
                color: "primary.main",
              }}
            >
              {speaker.role}: {speaker.name}
            </Link>

          </Stack>

        ))}

      </Stack>

      </Stack>

      <Divider sx={{ my: 5 }} />

      <Typography
        variant="h5"
        fontWeight={700}
      >
        About this Session
      </Typography> 

      <Typography
        mt={2}
        color="text.secondary"
      >
        {session.description}
      </Typography>

      <Paper
        sx={{
          mt: 5,
          p: 3,
          borderRadius: 3,
        }}
      >

        <Typography
          variant="h6"
          fontWeight={700}
        >
          Capacity
        </Typography>

        <Typography mt={2}>
          {session.capacity || 150} Seats
        </Typography>

      </Paper>

      <Button
        variant="contained"
        size="large"
        sx={{
          mt: 5,
          px: 5,
        }}
        disabled={session.registered}
        onClick={handleRegister}
      >

        {session.registered
          ? "✓ Registered"
          : "Register for Session"}

      </Button>

    </Box>

  );

}

export default SessionDetails;