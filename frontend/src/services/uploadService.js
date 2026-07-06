import axios from "axios";
import { API_BASE_URL } from "../config/api";

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await axios.post(
    `${API_BASE_URL}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};