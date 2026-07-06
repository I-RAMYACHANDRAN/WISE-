import axios from "axios";

import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/contact`;

// ====================================
// Get Contact Information
// ====================================

export const getContact = async () => {

  const response = await axios.get(API_URL);

  return response.data;

};

// ====================================
// Update Contact Information
// ====================================

export const updateContact = async (contact) => {

  const response = await axios.put(
    API_URL,
    contact
  );

  return response.data;

};