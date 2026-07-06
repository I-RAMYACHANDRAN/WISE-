import { useEffect, useState } from "react";

import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";


import TopBar from "../components/TopBar";
import GalleryCard from "../components/gallery/GalleryCard";
import ImageViewer from "../components/gallery/ImageViewer";

import { getGallery } from "../services/galleryService";

function Gallery() {

  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {

    loadGallery();

  }, []);

  const loadGallery = async () => {

    try {

      const data = await getGallery();

      setImages(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const openViewer = (image) => {

    setSelectedImage(image);

    setOpen(true);

  };

  if (loading) {

    return <CircularProgress />;

  }

  return (

    <Box>

   
      <Grid container spacing={3}>

  {images.map((item) => (

    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      key={item._id}
    >

      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
        }}
      >

        <Box
          component="img"
          src={item.image}
          alt={item.caption}
          sx={{
            width: "100%",
            height: 250,
            objectFit: "cover",
          }}
        />

        <Box sx={{ p: 2 }}>

          <Typography
            variant="h6"
                fontWeight={600}
              >
                {item.caption}
              </Typography>

            </Box>

          </Paper>

        </Grid>

      ))}

    </Grid>

      
    </Box>

  );

}

export default Gallery;