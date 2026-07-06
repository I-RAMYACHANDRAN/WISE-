import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/speakers`;
const UPLOAD_URL = `${API_BASE_URL}/upload`;

export const getSpeakers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createSpeaker = async (speaker) => {
  const response = await axios.post(API_URL, speaker);
  return response.data;
};

export const updateSpeaker = async (id, speaker) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    speaker
  );
  return response.data;
};

export const deleteSpeaker = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );
  return response.data;
};

// Upload speaker image
export const uploadSpeakerImage = async (file) => {

  const formData = new FormData();

  formData.append("image", file);

  const response = await axios.post(
    UPLOAD_URL,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;

};