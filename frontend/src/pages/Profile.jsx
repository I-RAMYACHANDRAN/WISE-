import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import { API_BASE_URL } from "../config/api";
import {
  getProfile,
  updateProfile,
} from "../services/authService";

import {
    uploadPhoto
} from "../services/authService";


function InfoCard({ icon, title, value }) {

  return (

    <Card
      sx={{
        borderRadius: 3,
        height: "100%",
      }}
    >

      <CardContent>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mb={1}
        >

          {icon}

          <Typography
            color="text.secondary"
            fontWeight={600}
          >
            {title}
          </Typography>

        </Stack>

        <Typography
          variant="h6"
          fontWeight={600}
        >
          {value || "-"}
        </Typography>

      </CardContent>

    </Card>

  );

}

function Profile() {

  const SERVER_URL = API_BASE_URL.replace("/api", "");

  const [user, setUser] = useState(null);

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    organization: "",
    designation: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    try {

      const loggedInUser = JSON.parse(
        localStorage.getItem("attendeeUser")
      );

      const response = await getProfile(
        loggedInUser._id
      );

      setUser(response.user);

      setForm({

        name: response.user.name || "",

        phone: response.user.phone || "",

        organization:
          response.user.organization || "",

        designation:
          response.user.designation || "",

      });

    } catch (error) {

      console.error(error);

    }

  };

  const handleSave = async () => {

    try {

      await updateProfile(
        user._id,
        form
      );

      await loadProfile();

      setOpen(false);

      alert("Profile updated successfully.");

    } catch (error) {

      console.error(error);

      alert("Unable to update profile.");

    }

  };

  const handlePhotoUpload =
    async (event) => {

        try {

            const file =
                event.target.files[0];

            if (!file) return;

            await uploadPhoto(

                user._id,

                file

            );

            await loadProfile();

        }

        catch (error) {

            console.error(error);

            alert(
                "Unable to upload image."
            );

        }

    };

  if (!user) {

    return (
      <Typography sx={{ p: 5 }}>
        Loading...
      </Typography>
    );

  }
    return (

    <Box sx={{ p: 4 }}>


      {/* Profile Card */}

      <Card
        sx={{
          borderRadius: 5,
          mb: 5,
          textAlign: "center",
          p: 4,
        }}
      >

        <Avatar
          src={
            user.profileImage
             ? `${SERVER_URL}/${user.profileImage}`
            : ""
          }
          sx={{
            width: 110,
            height: 110,
            mx: "auto",
            mb: 2,
            bgcolor: "#6C3EF4",
            fontSize: 42,
          }}
        >
          {!user.profileImage &&
            user.name?.charAt(0).toUpperCase()}
        </Avatar>

        <Typography
          variant="h4"
          fontWeight={700}
        >
          {user.name}
        </Typography>

        <Typography
          color="text.secondary"
          mt={1}
        >
          {user.designation}
        </Typography>

        <Typography
          color="text.secondary"
        >
          {user.organization}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          mt={4}
        >

          <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              component="label"
          >
              Upload Photo

          <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
              />
          </Button>

          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setOpen(true)}
          >
            Edit Profile
          </Button>

        </Stack>

      </Card>

      {/* Personal Information */}

      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
      >
        Personal Information
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} md={6}>
          <InfoCard
            icon={<EmailIcon color="primary" />}
            title="Email"
            value={user.email}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InfoCard
            icon={<PhoneIcon color="primary" />}
            title="Phone"
            value={user.phone}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InfoCard
            icon={<BusinessIcon color="primary" />}
            title="Organization"
            value={user.organization}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InfoCard
            icon={<WorkIcon color="primary" />}
            title="Designation"
            value={user.designation}
          />
        </Grid>

      </Grid>

      {/* Edit Profile Dialog */}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >

        <DialogTitle>
          Edit Profile
        </DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            label="Phone"
            margin="normal"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            label="Organization"
            margin="normal"
            value={form.organization}
            onChange={(e) =>
              setForm({
                ...form,
                organization: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            label="Designation"
            margin="normal"
            value={form.designation}
            onChange={(e) =>
              setForm({
                ...form,
                designation: e.target.value,
              })
            }
          />

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

    </Box>

  );

}

export default Profile;