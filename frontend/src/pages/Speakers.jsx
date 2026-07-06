import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Stack,
  Chip,
  CircularProgress,
} from "@mui/material";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useNavigate } from "react-router-dom";

import TopBar from "../components/TopBar";

import { getSpeakers } from "../services/speakerService";

function Speakers() {
  const navigate = useNavigate();

  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSpeakers();
  }, []);

  const loadSpeakers = async () => {
    try {
      const data = await getSpeakers();
      setSpeakers(data);
    } catch (error) {
      console.error("Error loading speakers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : speakers.length === 0 ? (
        <Typography
          align="center"
          color="text.secondary"
          sx={{ mt: 6 }}
        >
          No speakers available.
        </Typography>
      ) : (
        speakers.map((speaker) => (
          <Card
            key={speaker._id}
            sx={{
              mb: 3,
              borderRadius: 4,
              boxShadow: 2,
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                spacing={3}
                alignItems="center"
              >
                <Avatar
                  src={speaker.image}
                  sx={{
                    width: 90,
                    height: 90,
                  }}
                />

                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h5"
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

                  {speaker.bio && (
                    <Typography
                      color="text.secondary"
                      mt={2}
                    >
                      {speaker.bio}
                    </Typography>
                  )}

                  {speaker.expertise &&
                    speaker.expertise.length > 0 && (
                      <Stack
                        direction="row"
                        spacing={1}
                        mt={2}
                        flexWrap="wrap"
                      >
                        {speaker.expertise.map((item) => (
                          <Chip
                            key={item}
                            label={item}
                            size="small"
                          />
                        ))}
                      </Stack>
                    )}
                </Box>

                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIosIcon />}
                  onClick={() =>
                    navigate(`/speaker/${speaker._id}`)
                  }
                >
                  View Profile
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

export default Speakers;