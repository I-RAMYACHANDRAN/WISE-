import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { getSessions } from "../services/sessionService";

function NextSessionCard() {

  const navigate = useNavigate();

  const [session, setSession] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadNextSession();

  }, []);

  const formatTime = (time) => {

    if (!time) return "";

    const [hours, minutes] = time.split(":");

    const h = Number(hours);

    const suffix = h >= 12 ? "PM" : "AM";

    const displayHour =
      h % 12 === 0 ? 12 : h % 12;

    return `${displayHour}:${minutes} ${suffix}`;

  };

  const loadNextSession = async () => {

    try {

      const sessions = await getSessions();

      const now = new Date();

      const upcoming = sessions

        .map((session) => {

          const dateTime = new Date(

            `${session.date}T${session.startTime}:00`

          );

          return {

            ...session,

            dateTime,

          };

        })

        .filter(
          (session) =>
            session.dateTime >= now
        )

        .sort(
          (a, b) =>
            a.dateTime - b.dateTime
        );

      if (upcoming.length > 0) {

        setSession(upcoming[0]);

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <CircularProgress />;

  }

  if (!session) {

    return (

      <Card sx={{ mb: 3 }}>

        <CardContent>

          <Typography variant="h6">

            No upcoming sessions.

          </Typography>

        </CardContent>

      </Card>

    );

  }

  return (

    <Card sx={{ mb: 3 }}>

      <CardContent>

        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          📅 Next Session
        </Typography>

        <Stack spacing={1}>

          <Typography variant="h5">

            {session.title}

          </Typography>

          <Typography color="text.secondary">

            Speaker: {session.speaker}

          </Typography>

          <Typography color="text.secondary">

            📅 {session.date}

          </Typography>

          <Typography color="text.secondary">

            🕘 {formatTime(session.startTime)}

          </Typography>

          <Typography color="text.secondary">

            📍 {session.venue}

          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 2,
              width: 180,
            }}
            onClick={() =>
              navigate(`/agenda/${session._id}`)
            }
          >
            View Details
          </Button>

        </Stack>

      </CardContent>

    </Card>

  );

}

export default NextSessionCard;