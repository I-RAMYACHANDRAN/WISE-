import axios from "axios";

const API = "http://localhost:5000/api/auth";

// ==========================
// Register
// ==========================

export const register = async (user) => {

  const response = await axios.post(
    `${API}/register`,
    user
  );

  return response.data;

};

// ==========================
// Login
// ==========================

export const login = async (credentials) => {

  const response = await axios.post(
    `${API}/login`,
    credentials
  );

  return response.data;

};

// ==========================
// Get Profile
// ==========================

export const getProfile = async (id) => {

  const response = await axios.get(
    `${API}/profile/${id}`
  );

  return response.data;

};

// ==========================
// Update Profile
// ==========================

export const updateProfile = async (
  id,
  profile
) => {

  const response = await axios.put(
    `${API}/profile/${id}`,
    profile
  );

  return response.data;

};

export const uploadPhoto = async (

    id,

    file

) => {

    const formData =
        new FormData();

    formData.append(

        "photo",

        file

    );

    const response =
        await axios.post(

            `${API}/profile/${id}/photo`,

            formData,

            {

                headers: {

                    "Content-Type":
                        "multipart/form-data",

                },

            }

        );

    return response.data;

};