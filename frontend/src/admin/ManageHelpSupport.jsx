import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
} from "@mui/material";

import {
  getContact,
  updateContact,
} from "../services/contactService";

function ManageHelpSupport() {

  const [contact, setContact] = useState({

    chairName: "",
    chairDesignation: "Conference Chair",
    chairEmail: "",
    chairPhone: "",

    coordinator1Name: "",
    coordinator1Designation: "Conference Coordinator",
    coordinator1Email: "",
    coordinator1Phone: "",

    coordinator2Name: "",
    coordinator2Designation: "Conference Coordinator",
    coordinator2Email: "",
    coordinator2Phone: "",

    helpDeskLocation: "",
    helpDeskHours: "",

  });

  useEffect(() => {

    loadContact();

  }, []);

  const loadContact = async () => {

    try {

      const data = await getContact();

      setContact(data);

    } catch (error) {

      console.error(error);

    }

  };

  const handleSave = async () => {

    try {

      await updateContact(contact);

      alert("Contact information updated successfully.");

    } catch (error) {

      console.error(error);

      alert("Unable to save contact information.");

    }

  };

  return (

    <Box>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
      >
        Help & Support
      </Typography>

      <Card sx={{ borderRadius: 4 }}>

        <CardContent>

          <Typography
            variant="h6"
            fontWeight={700}
            mb={3}
          >
            Conference Chair
          </Typography>

          <Grid container spacing={2}>

            <Grid item xs={12} md={6}>

              <TextField
                fullWidth
                label="Name"
                value={contact.chairName}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    chairName: e.target.value,
                  })
                }
              />

            </Grid>

            <Grid item xs={12} md={6}>

              <TextField
                fullWidth
                label="Designation"
                value={contact.chairDesignation}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    chairDesignation: e.target.value,
                  })
                }
              />

            </Grid>

            <Grid item xs={12} md={6}>

              <TextField
                fullWidth
                label="Email"
                value={contact.chairEmail}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    chairEmail: e.target.value,
                  })
                }
              />

            </Grid>

            <Grid item xs={12} md={6}>

              <TextField
                fullWidth
                label="Phone"
                value={contact.chairPhone}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    chairPhone: e.target.value,
                  })
                }
              />

            </Grid>

          </Grid>

          <Typography
            variant="h6"
            fontWeight={700}
            mt={5}
            mb={3}
          >
            Conference Coordinator 1
          </Typography>

          <Grid container spacing={2}>

            <Grid item xs={12} md={6}>

              <TextField
                fullWidth
                label="Name"
                value={contact.coordinator1Name}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    coordinator1Name: e.target.value,
                  })
                }
              />

            </Grid>

            <Grid item xs={12} md={6}>

              <TextField
                fullWidth
                label="Designation"
                value={contact.coordinator1Designation}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    coordinator1Designation: e.target.value,
                  })
                }
              />

            </Grid>

            <Grid item xs={12} md={6}>

              <TextField
                fullWidth
                label="Email"
                value={contact.coordinator1Email}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    coordinator1Email: e.target.value,
                  })
                }
              />

            </Grid>

            <Grid item xs={12} md={6}>

              <TextField
                fullWidth
                label="Phone"
                value={contact.coordinator1Phone}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    coordinator1Phone: e.target.value,
                  })
                }
              />

            </Grid>

          </Grid>

          <Typography
            variant="h6"
            fontWeight={700}
            mt={5}
            mb={3}
          >
            Conference Coordinator 2
          </Typography>

          <Grid container spacing={2}>

            <Grid item xs={12} md={6}>

              <TextField
                fullWidth
                label="Name"
                value={contact.coordinator2Name}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    coordinator2Name: e.target.value,
                  })
                }
              />

            </Grid>

            <Grid item xs={12} md={6}>

              <TextField
                fullWidth
                label="Designation"
                value={contact.coordinator2Designation}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    coordinator2Designation: e.target.value,
                  })
                }
              />

            </Grid>

            <Grid item xs={12} md={6}>

              <TextField
                fullWidth
                label="Email"
                value={contact.coordinator2Email}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    coordinator2Email: e.target.value,
                  })
                }
              />

            </Grid>

            <Grid item xs={12} md={6}>

              <TextField
                fullWidth
                label="Phone"
                value={contact.coordinator2Phone}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    coordinator2Phone: e.target.value,
                  })
                }
              />

            </Grid>

          </Grid>

          <Typography
            variant="h6"
            fontWeight={700}
            mt={5}
            mb={3}
          >
            Conference Help Desk
          </Typography>

          <Grid container spacing={2}>

            <Grid item xs={12}>

              <TextField
                fullWidth
                label="Help Desk Location"
                value={contact.helpDeskLocation}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    helpDeskLocation: e.target.value,
                  })
                }
              />

            </Grid>

            <Grid item xs={12}>

              <TextField
                fullWidth
                label="Help Desk Hours"
                value={contact.helpDeskHours}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    helpDeskHours: e.target.value,
                  })
                }
              />

            </Grid>

          </Grid>

          <Box
            display="flex"
            justifyContent="flex-end"
            mt={5}
          >

            <Button
              variant="contained"
              size="large"
              onClick={handleSave}
            >
              Save Contact Information
            </Button>

          </Box>

        </CardContent>

      </Card>

    </Box>

  );

}

export default ManageHelpSupport;