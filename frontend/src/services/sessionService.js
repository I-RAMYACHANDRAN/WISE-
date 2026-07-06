import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/sessions`;

// GET all sessions
export const getSessions = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// CREATE session
export const createSession = async (session) => {
  const response = await axios.post(API_URL, session);
  return response.data;
};

// UPDATE session
export const updateSession = async (id, session) => {
  const response = await axios.put(`${API_URL}/${id}`, session);
  return response.data;
};

// DELETE session
export const deleteSession = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// REGISTER session

// REGISTER session
export const registerSession = async (
  id,
  attendee
) => {

  const response = await axios.post(
    `${API_URL}/${id}/register`,
    attendee
  );

  return response.data;

};