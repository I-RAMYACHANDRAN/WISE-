import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Divider,
} from "@mui/material";

import ReplyIcon from "@mui/icons-material/Reply";

import {
  getQueries,
  replyQuery,
} from "../services/queryService";

function ManageQueries() {

  const [queries, setQueries] = useState([]);

  const [open, setOpen] = useState(false);

  const [selectedQuery, setSelectedQuery] =
    useState(null);

  const [reply, setReply] =
    useState("");

  useEffect(() => {

    loadQueries();

  }, []);

  const loadQueries = async () => {

    try {

      const data =
        await getQueries();

      setQueries(data);

    } catch (error) {

      console.error(error);

    }

  };

  const handleReply = (query) => {

    setSelectedQuery(query);

    setReply(query.reply || "");

    setOpen(true);

  };

  const pendingQueries =
    queries.filter(
      (q) => q.status === "Pending"
    );

  const answeredQueries =
    queries.filter(
      (q) => q.status === "Answered"
    );

  return (

    <Box>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
      >
        Manage Queries
      </Typography>

      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
      >
        Pending Queries ({pendingQueries.length})
      </Typography>

      {pendingQueries.length === 0 ? (

        <Card
          sx={{
            borderRadius: 4,
            mb: 5,
          }}
        >

          <CardContent>

            <Typography color="text.secondary">
              No pending queries.
            </Typography>

          </CardContent>

        </Card>

      ) : (

        pendingQueries.map((query) => (

          <Card
            key={query._id}
            sx={{
              mb: 3,
              borderRadius: 4,
            }}
          >

            <CardContent>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >

                <Box>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    {query.attendeeName}
                  </Typography>

                  <Typography
                    color="primary"
                    mt={1}
                  >
                    {query.subject}
                  </Typography>

                </Box>

                <Chip
                  label="Pending"
                  color="warning"
                />

              </Stack>

              <Typography mt={3}>
                {query.question}
              </Typography>

              <Button
                sx={{ mt: 3 }}
                variant="contained"
                startIcon={<ReplyIcon />}
                onClick={() =>
                  handleReply(query)
                }
              >
                Reply
              </Button>

            </CardContent>

          </Card>

        ))

      )}
            <Typography
        variant="h5"
        fontWeight={700}
        mt={5}
        mb={3}
      >
        Answered Queries ({answeredQueries.length})
      </Typography>

      {answeredQueries.length === 0 ? (

        <Card
          sx={{
            borderRadius: 4,
            mb: 5,
          }}
        >

          <CardContent>

            <Typography
              color="text.secondary"
            >
              No answered queries.
            </Typography>

          </CardContent>

        </Card>

      ) : (

        answeredQueries.map((query) => (

          <Card
            key={query._id}
            sx={{
              mb: 3,
              borderRadius: 4,
            }}
          >

            <CardContent>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >

                <Box>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    {query.attendeeName}
                  </Typography>

                  <Typography
                    color="primary"
                    mt={1}
                  >
                    {query.subject}
                  </Typography>

                </Box>

                <Chip
                  label="Answered"
                  color="success"
                />

              </Stack>

              <Typography mt={3}>
                {query.question}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography
                color="success.main"
                fontWeight={700}
              >
                Organizer Reply
              </Typography>

              <Typography mt={1}>
                {query.reply}
              </Typography>

            </CardContent>

          </Card>

        ))

      )}
            <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >

        <DialogTitle>
          Reply to Attendee
        </DialogTitle>

        <DialogContent>

          {selectedQuery && (

            <>

              <Typography
                fontWeight={700}
                mt={1}
              >
                Attendee
              </Typography>

              <Typography>
                {selectedQuery.attendeeName}
              </Typography>

              <Typography
                fontWeight={700}
                mt={3}
              >
                Subject
              </Typography>

              <Typography>
                {selectedQuery.subject}
              </Typography>

              <Typography
                fontWeight={700}
                mt={3}
              >
                Question
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  p: 2,
                  bgcolor: "#F5F5F5",
                  borderRadius: 2,
                }}
              >
                {selectedQuery.question}
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={5}
                label="Reply"
                value={reply}
                sx={{ mt: 4 }}
                onChange={(e) =>
                  setReply(e.target.value)
                }
              />

            </>

          )}

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() =>
              setOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={async () => {

              if (!reply.trim()) {

                alert("Please enter a reply.");

                return;

              }

              try {

                await replyQuery(
                  selectedQuery._id,
                  reply
                );

                setOpen(false);

                setReply("");

                setSelectedQuery(null);

                await loadQueries();

                alert("Reply sent successfully.");

              } catch (error) {

                console.error(error);

                alert(
                  error.response?.data?.message ||
                  "Unable to send reply."
                );

              }

            }}
          >
            Send Reply
          </Button>

        </DialogActions>

      </Dialog>

    </Box>

  );

}

export default ManageQueries;