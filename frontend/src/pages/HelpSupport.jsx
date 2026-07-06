import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  MenuItem,
  Divider,
  Chip,
  Stack,
} from "@mui/material";

import {
  getQueries,
  createQuery,
} from "../services/queryService";

import {
  getContact,
} from "../services/contactService";

function HelpSupport() {

  const [queries, setQueries] = useState([]);

  const [contact, setContact] = useState({});

  const [subject, setSubject] =
    useState("Registration");

  const [question, setQuestion] =
    useState("");

  const user = JSON.parse(
    localStorage.getItem("attendeeUser")
  );

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const queryData =
        await getQueries();

      const contactData =
        await getContact();

      setQueries(queryData);

      setContact(contactData);

    } catch (error) {

      console.error(error);

    }

  };

  const handleSubmit = async () => {

    if (!question.trim()) {

      alert("Please enter your question.");

      return;

    }

    try {

      await createQuery({

        attendeeId: user._id,

        attendeeName: user.name,

        subject,

        question,

      });

      alert(
        "Your query has been submitted."
      );

      setQuestion("");

      setSubject("Registration");

      loadData();

    } catch (error) {

      console.error(error);

      alert(
        "Unable to submit query."
      );

    }

  };

  const myQueries = queries.filter(

    (item) =>

      String(item.attendeeId) ===
      String(user._id)

  );

  return (

    <Box sx={{ p: 3 }}>

      <Typography
        variant="h5"
        fontWeight={700}
        mb={1}
      >
        Need Assistance?
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Our conference organizing committee is
        here to help.
      </Typography>

      {/* Ask Question */}

      <Card
        sx={{
          borderRadius: 4,
          mb: 4,
        }}
      >

        <CardContent>

          <Typography
            variant="h6"
            fontWeight={700}
            mb={3}
          >
            Ask a Question
          </Typography>

          <Grid container spacing={3}>

  {/* Subject */}

  <Grid item xs={12} md={6}>

    <TextField
      select
      fullWidth
      label="Subject"
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
    >
      <MenuItem value="Registration">Registration</MenuItem>
      <MenuItem value="Sessions">Sessions</MenuItem>
      <MenuItem value="Speakers">Speakers</MenuItem>
      <MenuItem value="Venue">Venue</MenuItem>
      <MenuItem value="Food & Facilities">Food & Facilities</MenuItem>
      <MenuItem value="Technical Support">Technical Support</MenuItem>
      <MenuItem value="General">General</MenuItem>
    </TextField>

  </Grid>

  {/* Question - Full Width */}

  <Grid item xs={12}>

    <TextField
      fullWidth
      multiline
      rows={6}
      label="Question"
      placeholder="Type your question here..."
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
    />

  </Grid>

  {/* Submit Button - New Line */}

  <Grid item xs={12}>

    <Button
      variant="contained"
      size="large"
      onClick={handleSubmit}
      sx={{
        px: 5,
        borderRadius: 2,
      }}
    >
      Submit Query
    </Button>

  </Grid>

</Grid>

        </CardContent>

      </Card>
            {/* My Queries */}

      <Card
        sx={{
          borderRadius: 4,
          mb: 4,
        }}
      >
        <CardContent>

          <Typography
            variant="h6"
            fontWeight={700}
            mb={3}
          >
            My Queries
          </Typography>

          {myQueries.length === 0 ? (

            <Typography color="text.secondary">
              You haven't submitted any queries yet.
            </Typography>

          ) : (

            myQueries.map((query) => (

              <Card
                key={query._id}
                variant="outlined"
                sx={{
                  mb: 2,
                  borderRadius: 3,
                }}
              >

                <CardContent>

                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={3}
                    mb={2}
                    >

                    <Typography
                        fontWeight={700}
                    >
                        {query.subject}
                    </Typography>

                    <Chip
                        label={query.status}
                        color={
                        query.status === "Answered"
                            ? "success"
                            : "warning"
                        }
                    />

                    </Stack>

                  <Typography>
                    {query.question}
                  </Typography>

                  {query.reply && (

                    <Box mt={3}>

                      <Divider sx={{ mb: 2 }} />

                      <Typography
                        fontWeight={700}
                        color="primary"
                      >
                        Organizer Response
                      </Typography>

                      <Typography
                        sx={{ mt: 1 }}
                      >
                        {query.reply}
                      </Typography>

                    </Box>

                  )}

                </CardContent>

              </Card>

            ))

          )}

        </CardContent>

      </Card>

      {/* Contact Us */}

      <Card
        sx={{
          borderRadius: 4,
        }}
      >

        <CardContent>

          <Typography
            variant="h6"
            fontWeight={700}
            mb={3}
          >
            Contact Us
          </Typography>

          <Grid container spacing={4}>

            <Grid item xs={12} md={4}>

              <Typography
                fontWeight={700}
                color="primary"
              >
                Conference Chair
              </Typography>

              <Typography mt={2}>
                {contact.chairName}
              </Typography>

              <Typography color="text.secondary">
                {contact.chairDesignation}
              </Typography>

              <Typography mt={2}>
                📧 {contact.chairEmail}
              </Typography>

              <Typography>
                📞 {contact.chairPhone}
              </Typography>

            </Grid>

            <Grid item xs={12} md={4}>

              <Typography
                fontWeight={700}
                color="primary"
              >
                Conference Coordinator
              </Typography>

              <Typography mt={2}>
                {contact.coordinator1Name}
              </Typography>

              <Typography color="text.secondary">
                {contact.coordinator1Designation}
              </Typography>

              <Typography mt={2}>
                📧 {contact.coordinator1Email}
              </Typography>

              <Typography>
                📞 {contact.coordinator1Phone}
              </Typography>

            </Grid>

            <Grid item xs={12} md={4}>

              <Typography
                fontWeight={700}
                color="primary"
              >
                Conference Coordinator
              </Typography>

              <Typography mt={2}>
                {contact.coordinator2Name}
              </Typography>

              <Typography color="text.secondary">
                {contact.coordinator2Designation}
              </Typography>

              <Typography mt={2}>
                📧 {contact.coordinator2Email}
              </Typography>

              <Typography>
                📞 {contact.coordinator2Phone}
              </Typography>

            </Grid>

            <Grid item xs={12}>

              <Divider sx={{ my: 2 }} />

              <Typography
                fontWeight={700}
              >
                Conference Help Desk
              </Typography>

              <Typography mt={2}>
                📍 {contact.helpDeskLocation}
              </Typography>

              <Typography>
                🕘 {contact.helpDeskHours}
              </Typography>

            </Grid>

          </Grid>

        </CardContent>

      </Card>

    </Box>

  );

}

export default HelpSupport;