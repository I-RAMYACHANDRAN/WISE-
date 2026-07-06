import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Stack,
  MenuItem,
  Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import { getSpeakers } from "../services/speakerService";

import {
  getSessions,
  createSession,
  updateSession,
  deleteSession,
} from "../services/sessionService";

function ManageSessions() {

  const [sessions, setSessions] = useState([]);
  const [speakers, setSpeakers] = useState([]);

  const [open, setOpen] = useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const emptySpeaker = {
    speakerId: "",
    name: "",
    role: "Speaker",
  };

  const emptyForm = {
    title: "",
    type: "",
    venue: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    speakers: [emptySpeaker],
  };

  const [form, setForm] =
    useState(emptyForm);

  useEffect(() => {

    loadSessions();

    loadSpeakers();

  }, []);

  const loadSessions = async () => {

    try {

      const data =
        await getSessions();

      setSessions(data);

    } catch (error) {

      console.error(error);

    }

  };

  const loadSpeakers = async () => {

    try {

      const data =
        await getSpeakers();

      setSpeakers(data);

    } catch (error) {

      console.error(error);

    }

  };

  const handleOpen = () => {

    setEditingId(null);

    setForm(emptyForm);

    setOpen(true);

  };

  const handleEdit = (session) => {

    setEditingId(session._id);

    setForm({

      title: session.title || "",

      type: session.type || "",

      venue: session.venue || "",

      date: session.date || "",

      startTime:
        session.startTime || "",

      endTime:
        session.endTime || "",

      description:
        session.description || "",

      speakers:

        session.speakers?.length > 0

          ? session.speakers

          : [emptySpeaker],

    });

    setOpen(true);

  };

  const handleSave = async () => {

    try {

      if (editingId) {

        await updateSession(
          editingId,
          form
        );

      } else {

        await createSession(form);

      }

      await loadSessions();

      setOpen(false);

    } catch (error) {

      console.error(error);

      if (error.response) {

        alert(
          error.response.data.message
        );

      }

    }

  };

  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this session?"
      )
    )
      return;

    try {

      await deleteSession(id);

      await loadSessions();

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <>

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >

        <Typography
          variant="h4"
          fontWeight={700}
        >
          Manage Sessions
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{
            minWidth: 170,
            borderRadius: 3,
            px: 3,
          }}
        >
          Add Session
        </Button>

      </Box>

      {sessions.length === 0 ? (

        <Typography
          color="text.secondary"
        >
          No sessions available.
        </Typography>

      ) : (

        sessions.map((session) => (

          <Card
            key={session._id}
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
                color="primary"
              >
                {session.type}
              </Typography>

              <Typography
                color="text.secondary"
              >
                {session.venue}
              </Typography>

              <Typography
                color="text.secondary"
              >
                {session.date}
              </Typography>

              <Typography
                color="text.secondary"
              >
                {session.startTime}
                {" - "}
                {session.endTime}
              </Typography>

              {session.speakers?.map(
                (speaker, index) => (

                  <Typography
                    key={index}
                    sx={{ mt: 1 }}
                  >
                    <strong>
                      {speaker.role}
                    </strong>

                    {" : "}

                    {speaker.name}
                  </Typography>

                )
              )}

              {session.description && (

                <Typography
                  sx={{ mt: 2 }}
                >
                  {session.description}
                </Typography>

              )}

              <Stack
                direction="row"
                spacing={2}
                mt={3}
              >

                <Button
                  variant="outlined"
                  startIcon={
                    <EditIcon />
                  }
                  onClick={() =>
                    handleEdit(session)
                  }
                >
                  Edit
                </Button>

                <Button
                  color="error"
                  variant="outlined"
                  startIcon={
                    <DeleteIcon />
                  }
                  onClick={() =>
                    handleDelete(
                      session._id
                    )
                  }
                >
                  Delete
                </Button>

              </Stack>

            </CardContent>

          </Card>

        ))

      )}

      <Dialog
        open={open}
        onClose={() =>
          setOpen(false)
        }
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 4,
            minHeight: "85vh",
          },
        }}
      >

        <DialogTitle>

          {editingId
            ? "Edit Session"
            : "Add Session"}

        </DialogTitle>

        <DialogContent>

  <Stack spacing={3} sx={{ mt: 2 }}>

    {/* Session Information */}

    <TextField
      fullWidth
      label="Session Title"
      value={form.title}
      onChange={(e) =>
        setForm({
          ...form,
          title: e.target.value,
        })
      }
    />

    <TextField
      fullWidth
      label="Session Type"
      value={form.type}
      onChange={(e) =>
        setForm({
          ...form,
          type: e.target.value,
        })
      }
    />

    <TextField
      fullWidth
      label="Venue"
      value={form.venue}
      onChange={(e) =>
        setForm({
          ...form,
          venue: e.target.value,
        })
      }
    />

    <Grid container spacing={2}>

      <Grid item xs={4}>
        <TextField
          fullWidth
          type="date"
          label="Session Date"
          InputLabelProps={{
            shrink: true,
          }}
          value={form.date}
          onChange={(e) =>
            setForm({
              ...form,
              date: e.target.value,
            })
          }
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          type="time"
          label="Start Time"
          InputLabelProps={{
            shrink: true,
          }}
          value={form.startTime}
          onChange={(e) =>
            setForm({
              ...form,
              startTime: e.target.value,
            })
          }
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          fullWidth
          type="time"
          label="End Time"
          InputLabelProps={{
            shrink: true,
          }}
          value={form.endTime}
          onChange={(e) =>
            setForm({
              ...form,
              endTime: e.target.value,
            })
          }
        />
      </Grid>

    </Grid>

    <TextField
      fullWidth
      multiline
      rows={5}
      label="Description"
      value={form.description}
      onChange={(e) =>
        setForm({
          ...form,
          description: e.target.value,
        })
      }
    />

    <Divider />

    {/* Speakers */}

    <Typography
      variant="h6"
      fontWeight={700}
    >
      Speakers
    </Typography>

    <Grid
      container
      spacing={2}
      sx={{ mb: 1 }}
    >
      <Grid item xs={7}>
        <Typography
          fontWeight={600}
          color="text.secondary"
        >
          Speaker
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <Typography
          fontWeight={600}
          color="text.secondary"
        >
          Role
        </Typography>
      </Grid>

      <Grid item xs={1} />
    </Grid>

    {form.speakers.map(
      (speakerItem, index) => (

        <Box key={index}>

          <Grid
            container
            spacing={2}
            alignItems="center"
          >

            <Grid item xs={8}>

              <TextField
                select
                fullWidth
                size="small"
                value={speakerItem.speakerId}
                onChange={(e) => {

                  const selected =
                    speakers.find(
                      (s) =>
                        s._id ===
                        e.target.value
                    );

                  const updated = [
                    ...form.speakers,
                  ];

                  updated[index] = {

                    ...updated[index],

                    speakerId:
                      selected._id,

                    name:
                      selected.name,

                  };

                  setForm({
                    ...form,
                    speakers: updated,
                  });

                }}
              >

                {speakers.map(
                  (speaker) => (

                    <MenuItem
                      key={speaker._id}
                      value={speaker._id}
                    >

                      <Box>

                        <Typography
                          fontWeight={600}
                        >
                          {speaker.name}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {speaker.designation}
                          {" • "}
                          {speaker.company}
                        </Typography>

                      </Box>

                    </MenuItem>

                  )
                )}

              </TextField>

            </Grid>

            <Grid item xs={4}>

              <TextField
                select
                fullWidth
                size="small"
                value={speakerItem.role}
                onChange={(e) => {

                  const updated = [
                    ...form.speakers,
                  ];

                  updated[index].role =
                    e.target.value;

                  setForm({
                    ...form,
                    speakers: updated,
                  });

                }}
              >

                <MenuItem value="Speaker">
                  Speaker
                </MenuItem>

                <MenuItem value="Moderator">
                  Moderator
                </MenuItem>

                <MenuItem value="Panelist">
                  Panelist
                </MenuItem>

                <MenuItem value="Judge">
                  Judge
                </MenuItem>

                <MenuItem value="Chief Guest">
                  Chief Guest
                </MenuItem>

                <MenuItem value="Host">
                  Host
                </MenuItem>

              </TextField>

            </Grid>

            <Grid item xs={1}>

              {index > 0 && (

                <Button
                  color="error"
                  onClick={() => {

                    setForm({

                      ...form,

                      speakers:
                        form.speakers.filter(
                          (_, i) =>
                            i !== index
                        ),

                    });

                  }}
                >

                  <CloseIcon />

                </Button>

              )}

            </Grid>

          </Grid>

          {index !==
            form.speakers.length - 1 && (

            <Divider sx={{ my: 2 }} />

          )}

        </Box>

      )
    )}

    <Box
      display="flex"
      justifyContent="flex-end"
    >

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() =>

          setForm({

            ...form,

            speakers: [

              ...form.speakers,

              {
                speakerId: "",
                name: "",
                role: "Speaker",
              },

            ],

          })

        }
      >

        Add Speaker

      </Button>

    </Box>

  </Stack>

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
    onClick={handleSave}
  >
    Save
  </Button>

</DialogActions>

</Dialog>

</>

);

}

export default ManageSessions;