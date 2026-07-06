import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Rating,
  Divider,
} from "@mui/material";

import {
  getSessions,
} from "../services/sessionService";

import {
  getSpeakers,
} from "../services/speakerService";

import {
  getFeedback,
} from "../services/feedbackService";

import {
  getAnnouncements,
} from "../services/announcementService";

import {
  getGallery,
} from "../services/galleryService";

import {
  getQueries,
} from "../services/queryService";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const [sessions, setSessions] = useState([]);

  const [speakers, setSpeakers] = useState([]);

  const [feedback, setFeedback] = useState([]);

  const [announcements, setAnnouncements] = useState([]);

  const [gallery, setGallery] = useState([]);

  const [queries, setQueries] = useState([]);

  const navigate = useNavigate();

  const [averageRating, setAverageRating] =
    useState(0);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const sessionData =
        await getSessions();

      const speakerData =
        await getSpeakers();

      const feedbackData =
        await getFeedback();

      const announcementData =
        await getAnnouncements();

      const galleryData =
        await getGallery();

      const queryData =
        await getQueries();

      setSessions(sessionData);

      setSpeakers(speakerData);

      setFeedback(feedbackData);

      setAnnouncements(
        announcementData
      );

      setGallery(galleryData);

      setQueries(queryData);

      if (feedbackData.length > 0) {

        const avg =

          feedbackData.reduce(

            (sum, item) =>

              sum +
              item.overallRating,

            0

          ) /

          feedbackData.length;

        setAverageRating(
          avg.toFixed(1)
        );

      }

    } catch (error) {

      console.error(error);

    }

  };

  const sessionRatings = sessions.map(
    (session) => {

      const ratings =
        feedback.filter(

          (item) =>

            item.sessionId ===
            session._id

        );

      const avg =

        ratings.length > 0

          ? (

              ratings.reduce(

                (sum, item) =>

                  sum +
                  item.overallRating,

                0

              ) /

              ratings.length

            ).toFixed(1)

          : 0;

      return {

  title: session.title,

  average: avg,

  responses: ratings.length,

  registrations:
    session.attendees?.length || 0,

    };;

    }
  );
   const pendingQueries = queries.filter(
        (query) => query.status === "Pending"
      );

      const latestPending =
        pendingQueries.length > 0
          ? pendingQueries[0]
          : null;


  return (

    <Box>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
      >
        Good Morning,
        Organizer!
      </Typography>
            {/* Conference Overview */}

      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
      >
        Conference Overview
      </Typography>

      <Grid container spacing={3} mb={5}>

        <Grid item xs={12} md={4}>

          <Card sx={{ borderRadius: 4 }}>

            <CardContent>

              <Typography color="text.secondary">
                Total Registrations
              </Typography>

              <Typography
                variant="h3"
                fontWeight={700}
                mt={1}
              >
                {
                    new Set(
                      sessions.flatMap(
                        (session) =>
                          session.attendees?.map(
                            (attendee) => String(attendee.attendeeId)
                          ) || []
                      )
                    ).size
                  }
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} md={4}>

          <Card sx={{ borderRadius: 4 }}>

            <CardContent>

              <Typography color="text.secondary">
                Sessions
              </Typography>

              <Typography
                variant="h3"
                fontWeight={700}
                mt={1}
              >
                {sessions.length}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} md={4}>

          <Card sx={{ borderRadius: 4 }}>

            <CardContent>

              <Typography color="text.secondary">
                Speakers
              </Typography>

              <Typography
                variant="h3"
                fontWeight={700}
                mt={1}
              >
                {speakers.length}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} md={4}>

          <Card sx={{ borderRadius: 4 }}>

            <CardContent>

              <Typography color="text.secondary">
                Announcements
              </Typography>

              <Typography
                variant="h3"
                fontWeight={700}
                mt={1}
              >
                {announcements.length}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} md={4}>

          <Card sx={{ borderRadius: 4 }}>

            <CardContent>

              <Typography color="text.secondary">
                Gallery Images
              </Typography>

              <Typography
                variant="h3"
                fontWeight={700}
                mt={1}
              >
                {gallery.length}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} md={4}>

          <Card sx={{ borderRadius: 4 }}>

            <CardContent>

              <Typography color="text.secondary">
                Average Rating
              </Typography>

              <Rating
                value={Number(averageRating)}
                precision={0.1}
                readOnly
              />

              <Typography
                variant="h5"
                fontWeight={700}
                mt={1}
              >
                {averageRating} / 5
              </Typography>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

            {/* Session Performance */}

      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
      >
        Session Performance
      </Typography>

      <Card
        sx={{
          borderRadius: 4,
          mb: 5,
        }}
      >

        <CardContent>

          {sessionRatings.length === 0 ? (

            <Typography color="text.secondary">
              No feedback available yet.
            </Typography>

          ) : (

            sessionRatings.map((session, index) => (

             <Box key={index}>

  <Grid
    container
    alignItems="center"
    spacing={2}
    sx={{ py: 1 }}
  >

    {/* Session Name */}

    <Grid item xs={6}>

      <Typography fontWeight={600}>
        {session.title}
      </Typography>

    </Grid>

    {/* Rating */}

    <Grid item xs={3}>

      <Box>

        <Rating
          value={Number(session.average)}
          precision={0.1}
          readOnly
        />

        <Typography
          variant="body2"
          color="text.secondary"
        >
          ⭐ {session.average}
        </Typography>

      </Box>

    </Grid>

    {/* Registrations */}

    <Grid item xs={3}>

      <Typography
        align="right"
        fontWeight={600}
      >
        👥 {session.registrations}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        align="right"
      >
        Registrations
      </Typography>

    </Grid>

  </Grid>

  {index !== sessionRatings.length - 1 && (
    <Divider />
  )}

    </Box>
            ))

          )}

        </CardContent>

      </Card>

      {/* Pending Queries */}
            <Box
  display="flex"
  justifyContent="space-between"
  alignItems="center"
  mb={3}
>

  <Typography
    variant="h5"
    fontWeight={700}
  >
    Pending Queries (
    {
      queries.filter(
        q => q.status === "Pending"
      ).length
    }
    )
  </Typography>



</Box>

    {latestPending ? (

  <Card
    sx={{
      mb: 5,
      borderRadius: 4,
    }}
  >

    <CardContent>

      <Typography
        color="warning.main"
        fontWeight={700}
      >
        Latest Query
      </Typography>

      <Typography
        variant="h6"
        fontWeight={700}
        mt={2}
      >
        {latestPending.attendeeName}
      </Typography>

      <Typography
        color="primary"
        mt={1}
      >
        {latestPending.subject}
      </Typography>

      <Typography
        sx={{
          mt: 2,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {latestPending.question}
      </Typography>

      <Typography
        color="warning.main"
        fontWeight={600}
        mt={3}
      >
        Pending Response
      </Typography>

    </CardContent>
    
    <Button
    onClick={() =>
      navigate("/admin/queries")
    }
  >
    View All →
  </Button>

  </Card>
  

) : (

  <Card
    sx={{
      mb: 5,
      borderRadius: 4,
    }}
  >

    <CardContent>

      <Typography
        color="text.secondary"
      >
        No pending queries.
      </Typography>

    </CardContent>

  </Card>

)}
     

            {/* Recent Feedback */}

      <Typography
        variant="h5"
        fontWeight={700}
        mt={5}
        mb={3}
      >
        Recent Feedback
      </Typography>

      {feedback.length === 0 ? (

        <Card
          sx={{
            borderRadius: 4,
          }}
        >

          <CardContent>

            <Typography color="text.secondary">
              No feedback received yet.
            </Typography>

          </CardContent>

        </Card>

      ) : (

        feedback

          .slice(0, 3)

          .map((item) => (

            <Card
              key={item._id}
              sx={{
                mb: 2,
                borderRadius: 4,
              }}
            >

              <CardContent>

                <Typography
                  fontWeight={700}
                >
                  {item.attendeeName}
                </Typography>

                <Typography
                  color="primary"
                  sx={{ mt: 0.5 }}
                >
                  {item.sessionTitle}
                </Typography>

                <Rating
                  value={item.overallRating}
                  readOnly
                  sx={{ mt: 1 }}
                />

                <Typography
                  sx={{ mt: 2 }}
                >
                  {item.comments || "No comments"}
                </Typography>

              </CardContent>

            </Card>

          ))

      )}

    </Box>

  );

}

export default AdminDashboard;