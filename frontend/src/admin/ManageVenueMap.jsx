import { useEffect, useRef, useState } from "react";

import {
  Box,
  Button,
 CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from "@mui/icons-material/Add";

import { uploadImage } from "../services/uploadService";

import {
  getVenueMap,
  updateVenueMap,
} from "../services/venueMapService";

function ManageVenueMap() {

  const [venueMap, setVenueMap] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const imageRef = useRef();

  //----------------------------------------------------
  // Upload Image Dialog
  //----------------------------------------------------

  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  const [imageForm, setImageForm] = useState({
    title: "",
    description: "",
    type: "Campus",
    building: "",
    floor: "",
    image: "",
  });

  //----------------------------------------------------
  // Marker Dialog
  //----------------------------------------------------

  const [markerDialogOpen, setMarkerDialogOpen] = useState(false);

  const [selectedMarker, setSelectedMarker] = useState(null);

  const [venueName, setVenueName] = useState("");

  const [editingMarker, setEditingMarker] = useState(false);

  const [editingIndex, setEditingIndex] = useState(-1);

  //----------------------------------------------------
  // Load
  //----------------------------------------------------

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

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  //----------------------------------------------------
  // Selected Image
  //----------------------------------------------------

  const selectedImage =
    venueMap?.images?.[selectedImageIndex];

  //----------------------------------------------------
  // Upload Image File
  //----------------------------------------------------

  const handleUploadImage = async (event) => {

    const file = event.target.files[0];

    if (!file) return;

    try {

      const response = await uploadImage(file);

      setImageForm((prev) => ({
        ...prev,
        image: `http://localhost:5000${response.image}`,
      }));

    } catch (err) {

      console.error(err);

      alert("Upload failed");

    }

  };

  //----------------------------------------------------
  // Save Uploaded Image
  //----------------------------------------------------

  const handleAddImage = () => {

    if (!imageForm.title || !imageForm.image) {

      alert("Please upload an image and enter a title.");

      return;

    }

    const updatedImages = [
      ...venueMap.images,
      {
        ...imageForm,
        markers: [],
      },
    ];

    setVenueMap({
      ...venueMap,
      images: updatedImages,
    });

    setSelectedImageIndex(updatedImages.length - 1);

    setImageDialogOpen(false);

    setImageForm({
      title: "",
      description: "",
      type: "Campus",
      building: "",
      floor: "",
      image: "",
    });

  };

  //----------------------------------------------------
  // Delete Image
  //----------------------------------------------------

  const handleDeleteImage = (index) => {

    const updated = venueMap.images.filter(
      (_, i) => i !== index
    );

    setVenueMap({
      ...venueMap,
      images: updated,
    });

    setSelectedImageIndex(0);

  };

  //----------------------------------------------------
  // Save Entire Venue
  //----------------------------------------------------

  const handleSaveVenue = async () => {

    try {

      await updateVenueMap(venueMap);

      alert("Venue saved successfully.");

    } catch (err) {

      console.error(err);

      alert("Unable to save venue.");

    }

  };
    //----------------------------------------------------
  // Add Marker
  //----------------------------------------------------

  const handleImageClick = (event) => {

    if (!selectedImage) return;

    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;

    const y = (event.clientY - rect.top) / rect.height;

    const nextCode = String.fromCharCode(
      65 + (selectedImage.markers?.length || 0)
    );

    setSelectedMarker({
      code: nextCode,
      x,
      y,
    });

    setVenueName("");

    setEditingMarker(false);

    setEditingIndex(-1);

    setMarkerDialogOpen(true);

  };

  //----------------------------------------------------
  // Edit Marker
  //----------------------------------------------------

  const handleEditMarker = (marker) => {

    if (!selectedImage) return;

    const index =
      selectedImage.markers.findIndex(
        (m) => m.code === marker.code
      );

    setEditingIndex(index);

    setEditingMarker(true);

    setSelectedMarker(marker);

    setVenueName(marker.name);

    setMarkerDialogOpen(true);

  };

  //----------------------------------------------------
  // Save Marker
  //----------------------------------------------------

  const handleSaveMarker = () => {

    const updatedMarker = {
      ...selectedMarker,
      name: venueName,
    };

    const updatedImages = [...venueMap.images];

    const image = { ...updatedImages[selectedImageIndex] };

    const markers = [...image.markers];

    if (editingMarker) {

      markers[editingIndex] = updatedMarker;

    } else {

      markers.push(updatedMarker);

    }

    image.markers = markers;

    updatedImages[selectedImageIndex] = image;

    setVenueMap({
      ...venueMap,
      images: updatedImages,
    });

    setMarkerDialogOpen(false);

    setEditingMarker(false);

    setEditingIndex(-1);

    setSelectedMarker(null);

    setVenueName("");

  };

  //----------------------------------------------------
  // Delete Marker
  //----------------------------------------------------

  const handleDeleteMarker = () => {

    const updatedImages = [...venueMap.images];

    const image = { ...updatedImages[selectedImageIndex] };

    image.markers = image.markers.filter(
      (_, index) => index !== editingIndex
    );

    updatedImages[selectedImageIndex] = image;

    setVenueMap({
      ...venueMap,
      images: updatedImages,
    });

    setMarkerDialogOpen(false);

    setEditingMarker(false);

    setEditingIndex(-1);

    setSelectedMarker(null);

    setVenueName("");

  };

  //----------------------------------------------------
  // Image Selection
  //----------------------------------------------------

  const handleSelectImage = (index) => {

    setSelectedImageIndex(index);

  };

  //----------------------------------------------------
  // Loading
  //----------------------------------------------------

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
    Manage Venue Maps
  </Typography>

  <Stack
    direction={{ xs: "column", lg: "row" }}
    spacing={3}
    alignItems="flex-start"
  >

    {/* ========================================= */}
    {/* Left Panel */}
    {/* ========================================= */}

    <Paper
      sx={{
        width: 340,
        borderRadius: 4,
        p: 2,
      }}
    >

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >

        <Typography
          variant="h6"
          fontWeight={700}
        >
          Venue Images
        </Typography>

        <Button
          size="small"
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => setImageDialogOpen(true)}
        >
          Add
        </Button>

      </Stack>

      <Divider sx={{ mb: 2 }} />

      <List>

        {venueMap.images.length === 0 && (

          <Typography
            color="text.secondary"
            sx={{ p: 2 }}
          >
            No images uploaded.
          </Typography>

        )}

        {venueMap.images.map((img, index) => (

          <ListItemButton
            key={index}
            selected={selectedImageIndex === index}
            onClick={() => handleSelectImage(index)}
            sx={{
              borderRadius: 2,
              mb: 1,
            }}
          >

            <ListItemText

              primary={img.title}

              secondary={`${img.type}${
                img.building
                  ? ` • ${img.building}`
                  : ""
              }${
                img.floor
                  ? ` • Floor ${img.floor}`
                  : ""
              }`}

            />

          </ListItemButton>

        ))}

      </List>

    </Paper>

    {/* ========================================= */}
    {/* Image Viewer */}
    {/* ========================================= */}

    <Paper
      sx={{
        flex: 3,
        p: 3,
        borderRadius: 4,
      }}
    >

      {selectedImage ? (

        <>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >

            <Box>

              <Typography
                variant="h5"
                fontWeight={700}
              >
                {selectedImage.title}
              </Typography>

              <Typography
                color="text.secondary"
              >
                {selectedImage.description}
              </Typography>

            </Box>

            <Button
              color="error"
              variant="outlined"
              onClick={() =>
                handleDeleteImage(
                  selectedImageIndex
                )
              }
            >
              Delete Image
            </Button>

          </Stack>

          <Box
            sx={{
              position: "relative",
            }}
          >

            <Box
              ref={imageRef}
              component="img"
              src={selectedImage.image}
              alt={selectedImage.title}
              onClick={handleImageClick}
              sx={{
                width: "100%",
                borderRadius: 3,
                border: "1px solid #DDD",
                cursor: "crosshair",
              }}
            />

            {(selectedImage.markers || []).map(
              (marker) => (

                <Box
                  key={marker.code}
                  onClick={(e) => {

                    e.stopPropagation();

                    handleEditMarker(marker);

                  }}
                  sx={{
                    position: "absolute",

                    left: `${marker.x * 100}%`,
                    top: `${marker.y * 100}%`,

                    transform:
                      "translate(-50%,-50%)",

                    width: 42,
                    height: 42,

                    borderRadius: "50%",

                    bgcolor: "#1976D2",

                    color: "white",

                    display: "flex",

                    justifyContent: "center",

                    alignItems: "center",

                    fontWeight: 700,

                    cursor: "pointer",

                    boxShadow: 4,

                    "&:hover": {

                      bgcolor: "#1565C0",

                    },

                  }}
                >

                  {marker.code}

                </Box>

              )

            )}

          </Box>

        </>

      ) : (

        <Box
          sx={{
            height: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <Typography
            color="text.secondary"
          >
            Select an image from the left
          </Typography>

        </Box>

      )}

    </Paper>

    {/* ========================================= */}
    {/* Legend */}
    {/* ========================================= */}

    <Paper
      sx={{
        width: 320,
        borderRadius: 4,
        p: 3,
      }}
    >

      <Typography
        variant="h6"
        fontWeight={700}
        mb={3}
      >
        Venue Legend
      </Typography>

      {!selectedImage ||
      selectedImage.markers.length === 0 ? (

        <Typography
          color="text.secondary"
        >
          No markers added.
        </Typography>

      ) : (

        <Stack spacing={2}>

          {selectedImage.markers.map(
            (marker) => (

              <Paper
                key={marker.code}
                elevation={1}
                onClick={() =>
                  handleEditMarker(marker)
                }
                sx={{
                  p: 2,
                  cursor: "pointer",
                  borderRadius: 2,
                }}
              >

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >

                  <Box
                    sx={{
                      width: 34,
                      height: 34,
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

                  <Typography>

                    {marker.name}

                  </Typography>

                </Stack>

              </Paper>

            )

          )}

        </Stack>

      )}

    </Paper>

  </Stack>

  <Box
    sx={{
      mt: 4,
      display: "flex",
      justifyContent: "flex-end",
    }}
  >

    <Button
      variant="contained"
      size="large"
      onClick={handleSaveVenue}
    >
      Save Venue
    </Button>

  </Box>
        {/* ====================================== */}
      {/* Upload Image Dialog */}
      {/* ====================================== */}

      <Dialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Add Venue Image
        </DialogTitle>

        <DialogContent>

          <Stack spacing={2} sx={{ mt: 1 }}>

            <TextField
              fullWidth
              label="Title"
              value={imageForm.title}
              onChange={(e) =>
                setImageForm({
                  ...imageForm,
                  title: e.target.value,
                })
              }
            />

            <TextField
              fullWidth
              label="Description"
              multiline
              rows={2}
              value={imageForm.description}
              onChange={(e) =>
                setImageForm({
                  ...imageForm,
                  description: e.target.value,
                })
              }
            />

            <FormControl fullWidth>

              <InputLabel>Type</InputLabel>

              <Select
                label="Type"
                value={imageForm.type}
                onChange={(e) =>
                  setImageForm({
                    ...imageForm,
                    type: e.target.value,
                  })
                }
              >

                <MenuItem value="Campus">
                  Campus
                </MenuItem>

                <MenuItem value="Building">
                  Building
                </MenuItem>

                <MenuItem value="Floor Plan">
                  Floor Plan
                </MenuItem>

                <MenuItem value="Navigation">
                  Navigation
                </MenuItem>

                <MenuItem value="Hall">
                  Hall
                </MenuItem>

              </Select>

            </FormControl>

            <TextField
              fullWidth
              label="Building"
              placeholder="Building A"
              value={imageForm.building}
              onChange={(e) =>
                setImageForm({
                  ...imageForm,
                  building: e.target.value,
                })
              }
            />

            <TextField
              fullWidth
              type="number"
              label="Floor"
              placeholder="1"
              value={imageForm.floor}
              onChange={(e) =>
                setImageForm({
                  ...imageForm,
                  floor: e.target.value,
                })
              }
            />

            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              Upload Image

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
              />

            </Button>

            {imageForm.image && (

              <Box
                component="img"
                src={imageForm.image}
                alt="Preview"
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  border: "1px solid #DDD",
                }}
              />

            )}

          </Stack>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() =>
              setImageDialogOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleAddImage}
          >
            Add Image
          </Button>

        </DialogActions>

      </Dialog>
            {/* ====================================== */}
      {/* Marker Dialog */}
      {/* ====================================== */}

      <Dialog
        open={markerDialogOpen}
        onClose={() => setMarkerDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingMarker
            ? `Edit Marker ${selectedMarker?.code}`
            : `Add Marker ${selectedMarker?.code}`}
        </DialogTitle>

        <DialogContent>

          <Stack
            spacing={2}
            sx={{ mt: 1 }}
          >

            <TextField
              fullWidth
              label="Marker Name"
              value={venueName}
              onChange={(e) =>
                setVenueName(e.target.value)
              }
            />

          </Stack>

        </DialogContent>

        <DialogActions>

          {editingMarker && (

            <Button
              color="error"
              onClick={handleDeleteMarker}
            >
              Delete
            </Button>

          )}

          <Button
            onClick={() => {

              setMarkerDialogOpen(false);

              setEditingMarker(false);

              setEditingIndex(-1);

              setSelectedMarker(null);

              setVenueName("");

            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={!venueName.trim()}
            onClick={handleSaveMarker}
          >
            Save
          </Button>

        </DialogActions>

      </Dialog>

    </Box>

  );

}

export default ManageVenueMap;