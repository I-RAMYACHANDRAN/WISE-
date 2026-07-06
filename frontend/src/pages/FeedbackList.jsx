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
import RateReviewIcon from "@mui/icons-material/RateReview";

import { useNavigate } from "react-router-dom";

import agendaData from "../data/agendaData";

function FeedbackList() {
  const navigate = useNavigate();

  const sessions = agendaData.filter(
    (session) => session.registered
  );

  return (
    <Box sx={{ p: 4 }}>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={1}
      >
        Session Feedback
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Share your feedback for the sessions you attended.
      </Typography>

      {sessions.map((session) => (
        <Card
          key={session.id}
          sx={{
            mb: 3,
            borderRadius: 4,
          }}
        >
          <CardContent>

            <Typography
              variant="h6"
              fontWeight={700}
            >
              {session.title}
            </Typography>

            <Typography
              color="text.secondary"
              mt={1}
            >
              {session.venue}
            </Typography>

            <Typography
              color="text.secondary"
            >
              {session.startTime} - {session.endTime}
            </Typography>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mt={3}
            >

              <Chip
                icon={<CheckCircleIcon />}
                label="Registered"
                color="success"
              />

              {session.feedbackSubmitted ? (

                <Button
                  variant="contained"
                  color="success"
                  disabled
                >
                  Feedback Submitted
                </Button>

              ) : (

                <Button
                  variant="contained"
                  startIcon={<RateReviewIcon />}
                  onClick={() =>
                    navigate(`/feedback/${session.id}`)
                  }
                >
                  Give Feedback
                </Button>

              )}

            </Stack>

          </CardContent>
        </Card>
      ))}

    </Box>
  );
}

export default FeedbackList;