import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API = `${API_BASE_URL}/gallery`;

// =======================
// Get Gallery
// =======================

export const getGallery = async () => {
  const response = await axios.get(API);
  return response.data;
};

// =======================
// Add Image
// =======================

export const addGalleryImage = async (image, caption) => {
  const response = await axios.post(API, {
    image,
    caption,
  });

  return response.data;
};

// =======================
// Delete Image
// =======================

export const deleteGalleryImage = async (id) => {
  await axios.delete(`${API}/${id}`);
};