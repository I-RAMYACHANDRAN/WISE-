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
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import {
  getSpeakers,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
  uploadSpeakerImage,
} from "../services/speakerService";

function ManageSpeakers() {
  const [speakers, setSpeakers] = useState([]);

  const [open, setOpen] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    designation: "",
    company: "",
    email: "",
    linkedin: "",
    image: "",
    bio: "",
  });

  useEffect(() => {
    loadSpeakers();
  }, []);

  const loadSpeakers = async () => {
    try {
      const data = await getSpeakers();
      setSpeakers(data);
    } catch (error) {
      console.error("Error loading speakers:", error);
    }
  };

  const handleOpen = () => {
    setEditingId(null);

    setForm({
      name: "",
      designation: "",
      company: "",
      email: "",
      linkedin: "",
      image: "",
      bio: "",
    });

    setOpen(true);
  };

  const handleEdit = (speaker) => {
    setEditingId(speaker._id);

    setForm({
      name: speaker.name || "",
      designation: speaker.designation || "",
      company: speaker.company || "",
      email: speaker.email || "",
      linkedin: speaker.linkedin || "",
      image: speaker.image || "",
      bio: speaker.bio || "",
    });

    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateSpeaker(editingId, form);
      } else {
        await createSpeaker(form);
      }

      await loadSpeakers();

      setOpen(false);
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this speaker?")) return;

    try {
      await deleteSpeaker(id);

      await loadSpeakers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 4 }}
      >
        <Typography variant="h4" fontWeight={700}>
          Manage Speakers
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{
            ml: "auto",
            minWidth: 170,
            borderRadius: 3,
            px: 3,
          }}
        >
          Add Speaker
        </Button>
      </Stack>

      {speakers.length === 0 ? (
        <Typography color="text.secondary">
          No speakers available.
        </Typography>
      ) : (
        speakers.map((speaker) => (
          <Card
            key={speaker._id}
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
                {speaker.name}
              </Typography>

              <Typography color="primary">
                {speaker.designation}
              </Typography>

              <Typography color="text.secondary">
                {speaker.company}
              </Typography>

              <Typography color="text.secondary">
                {speaker.email}
              </Typography>

              <Typography
                sx={{ mt: 2 }}
              >
                {speaker.bio}
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                mt={3}
              >
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit(speaker)}
                >
                  Edit
                </Button>

                <Button
                  color="error"
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(speaker._id)}
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
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {editingId ? "Edit Speaker" : "Add Speaker"}
        </DialogTitle>

        <DialogContent>

          <Grid container spacing={2} sx={{ mt: 1 }}>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Designation"
                value={form.designation}
                onChange={(e) =>
                  setForm({
                    ...form,
                    designation: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company"
                value={form.company}
                onChange={(e) =>
                  setForm({
                    ...form,
                    company: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="LinkedIn URL"
                value={form.linkedin}
                onChange={(e) =>
                  setForm({
                    ...form,
                    linkedin: e.target.value,
                  })
                }
              />
            </Grid>

  
            <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={7}
              label="Biography"
              value={form.bio}
              onChange={(e) =>
                setForm({
                  ...form,
                  bio: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={12}>

              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  color: "text.secondary",
                }}
              >
                Speaker Photo
              </Typography>

              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  height: 56,
                  justifyContent: "flex-start",
                  textTransform: "none",
                }}
              >
                {form.image
                  ? "Change Photo"
                  : "Upload Photo"}

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {

                    const file = e.target.files[0];

                    if (!file) return;

                    try {

                      const response =
                        await uploadSpeakerImage(file);

                      setForm({
                        ...form,
                        image: response.image,
                      });

                    } catch (error) {

                      console.error(error);

                      alert("Image upload failed.");

                    }

                  }}
                />
              </Button>

              {form.image && (

                <Box
                  mt={2}
                  display="flex"
                  justifyContent="center"
                >

                  <img
                    src={`http://localhost:5000${form.image}`}
                    alt="Speaker"
                    style={{
                      width: 160,
                      height: 160,
                      objectFit: "cover",
                      borderRadius: 12,
                      border: "1px solid #ddd",
                    }}
                  />

                </Box>

              )}

            </Grid>

          </Grid>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() => setOpen(false)}
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

export default ManageSpeakers;