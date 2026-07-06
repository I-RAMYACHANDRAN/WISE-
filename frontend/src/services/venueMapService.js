import axios from "axios";

import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/venue-map`;

export const getVenueMap = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateVenueMap = async (venueMap) => {
  const response = await axios.put(API_URL, venueMap);
  return response.data;
};