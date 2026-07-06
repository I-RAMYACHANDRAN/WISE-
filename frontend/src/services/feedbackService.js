import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API = `${API_BASE_URL}/feedback`;

// =========================
// Get All Feedback
// =========================

export const getFeedback = async () => {

  const response =
    await axios.get(API);

  return response.data;

};

// =========================
// Submit Feedback
// =========================

export const submitFeedback = async (

  feedback

) => {

  const response =
    await axios.post(API, feedback);

  return response.data;

};

// =========================
// Delete Feedback  
// =========================

export const deleteFeedback = async (
  id
) => {

  await axios.delete(`${API}/${id}`);

};