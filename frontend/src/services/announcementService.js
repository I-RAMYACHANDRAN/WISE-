import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/announcements`;

// GET ALL ANNOUNCEMENTS
export const getAnnouncements = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// GET UNREAD ANNOUNCEMENTS
export const getUnreadAnnouncements = async (userId) => {
  const response = await axios.get(
    `${API_URL}/unread/${userId}`
  );
  return response.data;
};

// MARK ANNOUNCEMENTS AS VIEWED
export const markAnnouncementsViewed = async (userId) => {
  const response = await axios.put(
    `${API_URL}/viewed/${userId}`
  );
  return response.data;
};

// CREATE
export const createAnnouncement = async (announcement) => {
  const response = await axios.post(API_URL, announcement);
  return response.data;
};

// UPDATE
export const updateAnnouncement = async (id, announcement) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    announcement
  );
  return response.data;
};

// DELETE
export const deleteAnnouncement = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );
  return response.data;
};