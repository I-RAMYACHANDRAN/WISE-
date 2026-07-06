import { useEffect, useState } from "react";

import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { getVenueMap } from "../services/venueMapService";

function Venue() {

  const [venueMap, setVenueMap] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadVenueMap();

  }, []);

  const loadVenueMap = async () => {

    try {

      const data = await getVenueMap();

      if (!data.images) {
        data.images = [];
      }

      setVenueMap(data);

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
          mt: 8,
          textAlign: "center",
        }}
      >

        <CircularProgress />

      </Box>

    );

  }
  return (

  <Box sx={{ p: 4 }}>

    <Typography
      variant="h4"
      fontWeight={700}
      mb={4}
    >
      Venue Information
    </Typography>

    {venueMap.images.length === 0 ? (

      <Paper
        sx={{
          p: 6,
          textAlign: "center",
          borderRadius: 4,
        }}
      >

        <Typography color="text.secondary">
          Venue information is not available.
        </Typography>

      </Paper>

    ) : (

      <Stack spacing={5}>

        {venueMap.images.map((image, imageIndex) => (

          <Paper
            key={imageIndex}
            sx={{
              p: 3,
              borderRadius: 4,
            }}
          >

            {/* ====================================== */}
            {/* Image Header */}
            {/* ====================================== */}

            <Typography
              variant="h5"
              fontWeight={700}
            >
              {image.title}
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              mt={1}
              mb={2}
            >

              <Typography
                variant="body2"
                color="primary"
                fontWeight={600}
              >
                {image.type}
              </Typography>

              {image.building && (

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Building : {image.building}
                </Typography>

              )}

              {image.floor && (

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Floor : {image.floor}
                </Typography>

              )}

            </Stack>

            {image.description && (

              <Typography
                color="text.secondary"
                mb={3}
              >
                {image.description}
              </Typography>

            )}

            {/* ====================================== */}
            {/* Image */}
            {/* ====================================== */}

            <Box
              sx={{
                position: "relative",
                width: "100%",
                display: "inline-block",
              }}
            >

              <Box
                component="img"
                src={image.image}
                alt={image.title}
                sx={{
                  width: "100%",
                  borderRadius: 3,
                  border: "1px solid #DDD",
                  display: "block",
                }}
              />

              {(image.markers || []).map((marker) => (

                <Box
                  key={marker.code}
                  title={marker.name}
                  sx={{
                    position: "absolute",

                    left: `${marker.x * 100}%`,
                    top: `${marker.y * 100}%`,

                    transform:
                      "translate(-50%, -50%)",

                    width: 42,
                    height: 42,

                    borderRadius: "50%",

                    bgcolor: "#1976D2",

                    color: "white",

                    display: "flex",

                    justifyContent: "center",

                    alignItems: "center",

                    fontWeight: 700,

                    border: "3px solid white",

                    boxShadow: 3,

                    cursor: "pointer",

                    "&:hover": {

                      bgcolor: "#1565C0",

                    },

                  }}
                >

                  {marker.code}

                </Box>

              ))}

            </Box>

            {/* ====================================== */}
            {/* Legend */}
            {/* ====================================== */}

            {image.markers.length > 0 && (

              <>

                <Divider sx={{ my: 3 }} />

                <Typography
                  variant="h6"
                  fontWeight={700}
                  mb={2}
                >
                  Locations
                </Typography>

                <Stack
                  direction="row"
                  spacing={2}
                  flexWrap="wrap"
                  useFlexGap
                >

                  {image.markers.map((marker) => (

                    <Paper
                      key={marker.code}
                      elevation={1}
                      sx={{
                        p: 2,
                        minWidth: 220,
                        borderRadius: 3,
                      }}
                    >

                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                      >

                        <Box
                          sx={{
                            width: 36,
                            height: 36,

                            borderRadius: "50%",

                            bgcolor: "#1976D2",

                            color: "white",

                            display: "flex",

                            justifyContent: "center",

                            alignItems: "center",

                            fontWeight: 700,
                          }}
                        >
                          {marker.code}
                        </Box>

                        <Typography
                          fontWeight={600}
                        >
                          {marker.name}
                        </Typography>

                      </Stack>

                    </Paper>

                  ))}

                </Stack>

              </>

            )}

          </Paper>

        ))}

      </Stack>

    )}

  </Box>

);

}

export default Venue;