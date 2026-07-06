import axios from "axios";

const API = "http://localhost:5000/api/feedback";

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