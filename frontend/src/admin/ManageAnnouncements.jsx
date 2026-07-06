import { useEffect, useState } from "react";

import {
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

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../services/announcementService";

function ManageAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  const [open, setOpen] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    message: "",
    category: "",
    priority: "",
  });

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = () => {
    setEditingId(null);

    setForm({
      title: "",
      message: "",
      category: "",
      priority: "",
    });

    setOpen(true);
  };

  const handleEdit = (announcement) => {
    setEditingId(announcement._id);

    setForm({
      title: announcement.title || "",
      message: announcement.message || "",
      category: announcement.category || "",
      priority: announcement.priority || "",
    });

    setOpen(true);
  };

  const handleSave = async () => {
    try {

      if (editingId) {

        await updateAnnouncement(editingId, form);

      } else {

        await createAnnouncement(form);

      }

      await loadAnnouncements();

      setOpen(false);

    } catch (error) {

      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      }

    }
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this announcement?")) return;

    try {

      await deleteAnnouncement(id);

      await loadAnnouncements();

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
          Add Announcements
        </Button>
      </Stack>


      {announcements.length === 0 ? (

        <Typography color="text.secondary">
          No announcements available.
        </Typography>

      ) : (

        announcements.map((announcement) => (

          <Card
            key={announcement._id}
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
                {announcement.title}
              </Typography>

              <Typography
                color="primary"
                sx={{ mt: 1 }}
              >
                {announcement.category}
              </Typography>

              <Typography
                sx={{ mt: 2 }}
              >
                {announcement.message}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 2 }}
              >
                Priority : {announcement.priority}
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                mt={3}
              >

                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit(announcement)}
                >
                  Edit
                </Button>

                <Button
                  color="error"
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(announcement._id)}
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
          {editingId
            ? "Edit Announcement"
            : "Add Announcement"}
        </DialogTitle>

        <DialogContent>

          <Grid container spacing={2} sx={{ mt: 1 }}>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Category"
                placeholder="General, Event, Reminder..."
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Priority"
                placeholder="Low / Medium / High"
                value={form.priority}
                onChange={(e) =>
                  setForm({
                    ...form,
                    priority: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={5}
                label="Announcement Message"
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
              />
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

export default ManageAnnouncements;    