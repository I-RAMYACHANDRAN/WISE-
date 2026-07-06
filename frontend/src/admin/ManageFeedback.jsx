import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Rating,
  Typography,
} from "@mui/material";

import { getFeedback } from "../services/feedbackService";

function ManageFeedback() {

  const [feedback, setFeedback] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadFeedback();

  }, []);

  const loadFeedback = async () => {

    try {

      const data = await getFeedback();

      setFeedback(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <CircularProgress />;

  }

  return (

    <Box sx={{ p: 4 }}>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
      >
        Session Feedback
      </Typography>

      {feedback.map((item) => (

        <Card
          key={item._id}
          sx={{ mb: 3 }}
        >

          <CardContent>

            <Typography
              variant="h6"
              fontWeight={700}
            >
              {item.sessionTitle}
            </Typography>

            <Rating
              value={item.overallRating}
              readOnly
            />

            <Typography mt={2}>
              {item.comments}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              mt={2}
            >
              {new Date(
                item.createdAt
              ).toLocaleString()}
            </Typography>

          </CardContent>

        </Card>

      ))}

    </Box>

  );

}

export default ManageFeedback;