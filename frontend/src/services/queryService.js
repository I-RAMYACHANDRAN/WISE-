import axios from "axios";

import { API_BASE_URL } from "../config/api";

const API =
`${API_BASE_URL}/queries`;

export const getQueries = async () => {

  const response =
    await axios.get(API);

  return response.data;

};

export const createQuery = async (data) => {

  const response =
    await axios.post(API, data);

  return response.data;

};

export const replyQuery = async (id, reply) => {

  const response =
    await axios.put(
      `${API}/${id}/reply`,
      {
        reply,
      }
    );

  return response.data;

};