import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000"
});

export const getNotes = async (userId) => {
  try {
    const response = await api.get(`/api/notes/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const getNote = async (id) => {
  try {
    const response = await api.get(`/api/notes/single/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching note:", error);
    throw error;
  }
};

export const createNote = async (data) => {
  try {
    const response = await api.post("/api/notes", data);
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const updateNote = async (id, data) => {
  try {
    const response = await api.put(`/api/notes/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await api.delete(`/api/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

