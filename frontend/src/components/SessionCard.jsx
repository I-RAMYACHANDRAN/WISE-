import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Divider,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import SessionChip from "./SessionChip";

function SessionCard({ session }) {
  return (
    <Card
      elevation={2}
      sx={{
        mb: 3,
        borderRadius: 3,
        transition: ".3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <SessionChip type={session.type} />

          <Typography
            fontWeight="bold"
            color="primary"
          >
            {session.startTime}
          </Typography>
        </Stack>

        <Typography
          variant="h5"
          fontWeight="bold"
          mt={2}
        >
          {session.title}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mb={1}
        >
          <AccessTimeIcon fontSize="small" />

          <Typography>
            {session.startTime} - {session.endTime}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <LocationOnIcon fontSize="small" />

          <Typography>
            {session.venue}
          </Typography>
        </Stack>

        <Typography
          sx={{
            mt: 2,
            color: "text.secondary",
          }}
        >
          Speaker: {session.speaker}
        </Typography>

        <Typography
          sx={{
            mt: 2,
          }}
        >
          {session.description}
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 3,
          }}
        >
          View Details
        </Button>

      </CardContent>
    </Card>
  );
}

export default SessionCard;