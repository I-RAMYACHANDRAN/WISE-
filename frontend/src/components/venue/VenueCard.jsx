import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

function VenueCard({ venue }) {

  const navigate = useNavigate();

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 4,
        boxShadow: 2,
      }}
    >
      <CardContent>

        <Typography
          variant="h5"
          fontWeight={700}
        >
          {venue.name}
        </Typography>

        <Typography color="primary">
          {venue.building}
        </Typography>

        <Typography color="text.secondary">
          {venue.floor}
        </Typography>

        <Typography sx={{ mt: 2 }}>
          Capacity : {venue.capacity}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Today's Sessions : {venue.sessions.length}
        </Typography>

        <Stack
          direction="row"
          justifyContent="flex-end"
          mt={3}
        >
          <Button
            variant="contained"
            endIcon={<ArrowForwardIosIcon />}
            onClick={() =>
              navigate(`/venue/${venue.id}`)
            }
          >
            View Details
          </Button>
        </Stack>

      </CardContent>
    </Card>
  );
}

export default VenueCard;