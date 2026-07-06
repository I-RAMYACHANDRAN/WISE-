import {
  Box,
  Typography,
  Chip,
  Button,
} from "@mui/material";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";

const chipColors = {
  Keynote: "#8E24AA",
  "Technical Session": "#1976D2",
  Workshop: "#2E7D32",
  "Paper Presentation": "#F57C00",
  "Poster Presentation": "#00ACC1",
  "Panel Discussion": "#7B1FA2",
  "Networking Event": "#EC407A",
  "Cultural Event": "#5E35B1",
  Seminar: "#3949AB",
};

function TimelineItem({ session }) {
  const navigate = useNavigate();

  // Temporary debug
  console.log("Timeline Session:", session);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "120px 40px 170px 1fr 220px 180px",
        alignItems: "center",
        minHeight: 90,
        borderBottom: "1px solid #ECECEC",
        "&:hover": {
          bgcolor: "#FAFAFA",
        },
      }}
    >
      {/* Time */}

      <Typography
        fontWeight={700}
        color="#444"
      >
        {session.startTime}
      </Typography>

      {/* Timeline */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          height: "100%",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 2,
            bgcolor: "#E5E7EB",
            top: 0,
            bottom: 0,
          }}
        />

        <Box
          sx={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            bgcolor: chipColors[session.type] || "#1976D2",
            mt: 4,
            zIndex: 2,
          }}
        />
      </Box>

      {/* Session Type */}

      <Chip
        label={session.type}
        sx={{
          bgcolor: chipColors[session.type] || "#1976D2",
          color: "white",
          width: "fit-content",
          fontWeight: 600,
        }}
      />

      {/* Title */}

      <Box>
        <Typography
          fontWeight={700}
          fontSize={20}
        >
          {session.title}
        </Typography>

        {session.speaker && (
          <Typography
            color="text.secondary"
            fontSize={14}
          >
            {session.speaker}
          </Typography>
        )}
      </Box>

      {/* Venue */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <LocationOnOutlinedIcon
          fontSize="small"
          color="action"
        />

        <Typography color="text.secondary">
          {session.venue}
        </Typography>
      </Box>


      {/* <Button
        variant="contained"
        color="primary"
        onClick={() => {

          console.log(session);

          console.log(session._id);

          navigate(`/agenda/${session._id}`);

        }}
      >
        Test Button
      </Button> */}

      <Button
        endIcon={<ArrowForwardIosIcon />}
        onClick={() => {
          console.log("Clicked Session ID:", session._id);
          navigate(`/agenda/${session._id}`);
        }}
      >
        View Details
      </Button>
    </Box>
  );
}

export default TimelineItem;