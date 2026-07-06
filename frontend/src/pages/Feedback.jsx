import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Rating,
  TextField,
  Button,
  Stack,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";

import {
  getSessions,
} from "../services/sessionService";

import {
  submitFeedback,
} from "../services/feedbackService";

function Feedback() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [session, setSession] = useState(null);

  const [overallRating, setOverallRating] = useState(0);

  const [contentRating, setContentRating] = useState(0);

  const [speakerRating, setSpeakerRating] = useState(0);

  const [organizationRating, setOrganizationRating] = useState(0);

  const [inspirationRating, setInspirationRating] = useState(0);

  const [comments, setComments] = useState("");

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

  const handleSubmit = async () => {

    try {

      const loggedInUser = JSON.parse(
        localStorage.getItem("attendeeUser")
      );

      await submitFeedback({

        attendeeId: loggedInUser._id,

        attendeeName: loggedInUser.name,

        sessionId: session._id,

        sessionTitle: session.title,

        overallRating,

        contentRating,

        speakerRating,

        organizationRating,

        inspirationRating,

        comments,

      });

      alert("Thank you for your valuable feedback!");

      navigate("/myschedule");

    } catch (error) {

      console.error(error);

      alert("Unable to submit feedback.");

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

    <Box
      sx={{
        p: 4,
        maxWidth: 900,
        mx: "auto",
      }}
    >

      <Card
        sx={{
          borderRadius: 4,
        }}
      >

        <CardContent>

          <Typography
            variant="h5"
            fontWeight={700}
            mb={8}
          >
            {session.title}
          </Typography>
          <Box sx={{ height: 24 }} />

          {/* Overall */}

          <Typography
            variant="h6"
            fontWeight={700}
          >
            Overall Session Experience
          </Typography>

          <Typography
            color="text.secondary"
            mb={2}
          >
            Overall, how satisfied were you with this session?
          </Typography>

          <Rating
            size="large"
            value={overallRating}
            onChange={(e, value) =>
              setOverallRating(value)
            }
          />

          {/* Content */}

          <Box mt={5}>

            <Typography
              fontWeight={600}
              mb={1}
            >
              How would you rate the quality and relevance of the session content?
            </Typography>

            <Rating
              size="large"
              value={contentRating}
              onChange={(e, value) =>
                setContentRating(value)
              }
            />

          </Box>

          {/* Speaker */}

          <Box mt={5}>

            <Typography
              fontWeight={600}
              mb={1}
            >
              How effective was the speaker in delivering the session?
            </Typography>

            <Rating
              size="large"
              value={speakerRating}
              onChange={(e, value) =>
                setSpeakerRating(value)
              }
            />

          </Box>

          {/* Organization */}

          <Box mt={5}>

            <Typography
              fontWeight={600}
              mb={1}
            >
              How well was the session organized and managed?
            </Typography>

            <Rating
              size="large"
              value={organizationRating}
              onChange={(e, value) =>
                setOrganizationRating(value)
              }
            />

          </Box>

          {/* Inspiration */}

          <Box mt={5}>

            <Typography
              fontWeight={600}
              mb={1}
            >
              How inspired do you feel after attending this session?
            </Typography>


            <Rating
              size="large"
              value={inspirationRating}
              onChange={(e, value) =>
                setInspirationRating(value)
              }
            />

          <Box sx={{ height: 24 }} />

          </Box>
          <Typography
              color="text.secondary"
              mb={1}
            >
              Share how this session motivated you to learn, collaborate, or explore new ideas.
            </Typography>

          {/* Comments */}

          <TextField
            fullWidth
            multiline
            rows={5}
            label="Additional Comments or Suggestions"
            value={comments}
            onChange={(e) =>
              setComments(e.target.value)
            }
            sx={{ mt: 5 }}
          />

          <Stack
            direction="row"
            justifyContent="flex-end"
            mt={4}
          >

            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={overallRating === 0}
            >
              Submit Feedback
            </Button>

          </Stack>

        </CardContent>

      </Card>

    </Box>

  );

}

export default Feedback;