import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate, useParams } from "react-router-dom";

import { getSpeakers } from "../services/speakerService";
import { API_BASE_URL } from "../config/api";


function SpeakerDetails() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [speaker, setSpeaker] = useState(null);

  const [loading, setLoading] = useState(true);
  const SERVER_URL = API_BASE_URL.replace("/api", "");

  useEffect(() => {

    loadSpeaker();

  }, []);

  const loadSpeaker = async () => {

    try {

      const data = await getSpeakers();

      console.log("Speaker ID from URL:", id);
      console.log("Available Speakers:", data);

      const selected = data.find(
        (item) => String(item._id) === String(id)
      );

      setSpeaker(selected);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <Box
        sx={{
          textAlign: "center",
          mt: 6,
        }}
      >
        <CircularProgress />
      </Box>

    );

  }

  if (!speaker) {

    return (

      <Box sx={{ p: 4 }}>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Back
        </Button>

        <Typography variant="h5">
          Speaker not found.
        </Typography>

      </Box>

    );

  }

  return (

    <Box>

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={5}
      >

        <Avatar
          src={
            speaker.image
              ? `${SERVER_URL}${speaker.image}`
              : ""
          }
          alt={speaker.name}
          sx={{
            width: 180,
            height: 180,
            border: "3px solid #eee",
          }}
        />

        <Box>

          <Typography
            variant="h3"
            fontWeight={700}
          >
            {speaker.name}
          </Typography>

          <Typography
            color="primary"
            mt={1}
          >
            {speaker.designation}
          </Typography>

          <Typography color="text.secondary">
            {speaker.company}
          </Typography>

          <Typography
            sx={{
              mt: 4,
              lineHeight: 1.8,
            }}
          >
            {speaker.bio}
          </Typography>

          {speaker.expertise &&
            speaker.expertise.length > 0 && (

            <>

              <Typography
                variant="h6"
                mt={5}
                mb={2}
              >
                Expertise
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                flexWrap="wrap"
                useFlexGap
              >

                {speaker.expertise.map((skill) => (

                  <Chip
                    key={skill}
                    label={skill}
                    color="primary"
                  />

                ))}

              </Stack>

            </>

          )}

        </Box>

      </Stack>

    </Box>

  );

}

export default SpeakerDetails;