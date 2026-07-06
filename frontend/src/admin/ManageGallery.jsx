import { useEffect, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { uploadImage } from "../services/uploadService";

import {
  getGallery,
  addGalleryImage,
  deleteGalleryImage,
} from "../services/galleryService";
import { API_BASE_URL } from "../config/api";



function ManageGallery() {

  const [gallery, setGallery] = useState([]);

  const [loading, setLoading] = useState(true);

  const [image, setImage] = useState("");

  const [caption, setCaption] = useState("");
  const SERVER_URL  = API_BASE_URL.replace("/api", "");

  useEffect(() => {

    loadGallery();

  }, []);

  const loadGallery = async () => {

    try {

      const data = await getGallery();

      setGallery(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  // ==========================
  // Upload Image
  // ==========================

  const handleImageUpload = async (event) => {

    const file = event.target.files[0];

    if (!file) return;

    try {

      const response =
        await uploadImage(file);

      setImage(
        `${SERVER_URL}${response.image}`
      );

    } catch (error) {

      console.error(error);

      alert("Upload Failed");

    }

  };

  // ==========================
  // Save Image
  // ==========================

  const handleSave = async () => {

    if (!image) {

      alert("Please upload an image");

      return;

    }

    try {

      await addGalleryImage(
        image,
        caption
      );

      setImage("");

      setCaption("");

      loadGallery();

    } catch (error) {

      console.error(error);

    }

  };

  // ==========================
  // Delete Image
  // ==========================

  const handleDelete = async (id) => {

    try {

      await deleteGalleryImage(id);

      loadGallery();

    } catch (error) {

      console.error(error);

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
        Gallery
      </Typography>

      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
          mb: 4,
        }}
      >

        <Stack spacing={3}>
                      {/* Upload Button */}

          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload Image

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />

          </Button>

          {/* Image Preview */}

          {image && (

            <Box
              component="img"
              src={image}
              alt="Preview"
              sx={{
                width: 250,
                borderRadius: 2,
                border: "1px solid #DDD",
              }}
            />

          )}

          {/* Caption */}

          <TextField
            label="Image Caption"
            fullWidth
            value={caption}
            onChange={(e) =>
              setCaption(e.target.value)
            }
          />

          {/* Save */}

          <Button
            variant="contained"
            onClick={handleSave}
          >
            Save Image
          </Button>

        </Stack>

      </Paper>

      {/* ===================================== */}
      {/* Gallery Images */}
      {/* ===================================== */}

      <Stack spacing={3}>

        {gallery.length === 0 ? (

          <Typography
            color="text.secondary"
          >
            No gallery images uploaded.
          </Typography>

        ) : (

          gallery.map((item) => (

            <Paper
              key={item._id}
              sx={{
                p: 2,
                borderRadius: 3,
              }}
            >

              <Stack spacing={2}>

                <Box
                  component="img"
                  src={item.image}
                  alt={item.caption}
                  sx={{
                    width: "100%",
                    maxHeight: 350,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />

                <Typography
                  fontWeight={600}
                >
                  {item.caption}
                </Typography>

                <Button
                  color="error"
                  variant="outlined"
                  onClick={() =>
                    handleDelete(item._id)
                  }
                >
                  Delete
                </Button>

              </Stack>

            </Paper>

          ))

        )}

      </Stack>

    </Box>

  );

}

export default ManageGallery;
        