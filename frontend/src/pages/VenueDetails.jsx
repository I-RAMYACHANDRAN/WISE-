import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate, useParams } from "react-router-dom";

import { getVenueById } from "../services/venueMapService";

function VenueDetails() {

  const navigate = useNavigate();

  const { id } = useParams();

  const venue = getVenueById(id);

  if (!venue) {
    return <Typography>Venue not found.</Typography>;
  }

  return (
    <Box>

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/venue")}
      >
        Back to Venues
      </Button>

      <Typography
        variant="h3"
        fontWeight={700}
        mt={3}
      >
        {venue.name}
      </Typography>

      <Typography color="primary">
        {venue.building}
      </Typography>

      <Typography color="text.secondary">
        {venue.floor}
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Paper sx={{ p: 3, borderRadius: 3 }}>

        <Typography
          variant="h6"
          fontWeight={700}
        >
          Capacity
        </Typography>

        <Typography mt={1}>
          {venue.capacity} Participants
        </Typography>

      </Paper>

      <Paper
        sx={{
          p: 3,
          mt: 4,
          borderRadius: 3,
        }}
      >

        <Typography
          variant="h6"
          fontWeight={700}
        >
          Today's Sessions
        </Typography>

        <List>
          {venue.sessions.map((item) => (
            <ListItem key={item}>
              • {item}
            </ListItem>
          ))}
        </List>

      </Paper>

      <Paper
        sx={{
          p: 3,
          mt: 4,
          borderRadius: 3,
        }}
      >

        <Typography
          variant="h6"
          fontWeight={700}
        >
          Directions
        </Typography>

        <Typography mt={2}>
          {venue.directions}
        </Typography>

      </Paper>

    </Box>
  );
}

export default VenueDetails;