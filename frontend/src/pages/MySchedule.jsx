import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useNavigate } from "react-router-dom";

import { getSessions } from "../services/sessionService";
import { getFeedback } from "../services/feedbackService";

function MySchedule() {

  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [feedback, setFeedback] = useState([]);

  const user = JSON.parse(localStorage.getItem("attendeeUser"));

  useEffect(() => {

    loadData();

    // Reload whenever this page gains focus
    window.addEventListener("focus", loadData);

    return () => {
      window.removeEventListener("focus", loadData);
    };

  }, []);

  const loadData = async () => {

    try {

      const sessionData = await getSessions();

      const feedbackData = await getFeedback();

      setFeedback(feedbackData);

      console.log("Logged in User:", user);
      console.log("Sessions:", sessionData);

      const registeredSessions = sessionData.filter(
        (session) =>
          session.attendees?.some(
            (attendee) =>
              String(attendee.attendeeId) ===
              String(user._id)
          )
      );

      console.log(
        "Registered Sessions:",
        registeredSessions
      );

      setSessions(registeredSessions);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <Box sx={{ p: 3 }}>

      {sessions.length === 0 ? (

        <Card
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 4,
          }}
        >

          <Typography
            variant="h6"
            color="text.secondary"
          >
            You haven't registered for any sessions yet.
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => navigate("/agenda")}
          >
            Browse Sessions
          </Button>

        </Card>

      ) : (

        sessions.map((session) => {

          const submittedFeedback = feedback.some(
            (item) =>
              String(item.sessionId) ===
                String(session._id) &&
              String(item.attendeeId) ===
                String(user._id)
          );

          return (

            <Card
              key={session._id}
              sx={{
                mb: 3,
                borderRadius: 4,
              }}
            >

              <CardContent>

                <Typography
                  variant="h5"
                  fontWeight={700}
                >
                  {session.title}
                </Typography>

                <Typography
                  color="primary"
                  mt={1}
                >
                  {session.type}
                </Typography>

                {session.speakers?.map(
                  (speaker, index) => (

                    <Typography
                      key={index}
                      color="text.secondary"
                    >
                      {speaker.role}: {speaker.name}
                    </Typography>

                  )
                )}

                <Typography color="text.secondary">
                  Venue: {session.venue}
                </Typography>

                <Typography color="text.secondary">
                  Date: {session.date}
                </Typography>

                <Typography color="text.secondary">
                  {session.startTime} - {session.endTime}
                </Typography>

                <Stack spacing={3} mt={3}>

                  <Chip
                    icon={<CheckCircleIcon />}
                    label="Registered"
                    color="success"
                    sx={{
                      width: "fit-content",
                    }}
                  />

                  <Stack
                    direction="row"
                    spacing={2}
                  >

                    <Button
                      variant="outlined"
                      onClick={() =>
                        navigate(`/agenda/${session._id}`)
                      }
                    >
                      View Details
                    </Button>

                    {submittedFeedback ? (

                      <Button
                        variant="contained"
                        color="success"
                        disabled
                      >
                        ✓ Feedback Submitted
                      </Button>

                    ) : (

                      <Button
                        variant="contained"
                        onClick={() =>
                          navigate(`/feedback/${session._id}`)
                        }
                      >
                        Give Feedback
                      </Button>

                    )}

                  </Stack>

                </Stack>

              </CardContent>

            </Card>

          );

        })

      )}

    </Box>

  );

}

export default MySchedule;