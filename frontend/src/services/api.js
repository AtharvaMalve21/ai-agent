import axios from "axios";

// Base URL for API requests
const API_BASE_URL = import.meta.env.VITE_BACKEND_URI;

// Set withCredentials once for all requests
axios.defaults.withCredentials = true;

// Interceptor to handle unauthorized access
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error codes
    if (error.response?.status === 401) {
      console.error("Unauthorized. Redirecting to login...");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Authentication
  signup: async (credentials) => {
    const { data } = await axios.post(`${API_BASE_URL}/api/auth/register`, credentials);
    return data;
  },
  login: async (credentials) => {
    const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);
    return data;
  },
  profile: async () => {
    const { data } = await axios.get(`${API_BASE_URL}/api/auth/verify`);
    return data;
  },
  logout: async () => {
    const { data } = await axios.get(`${API_BASE_URL}/api/auth/logout`);
    return data;
  },

  // Agent Management
  getAgents: async () => {
    const { data } = await axios.get(`${API_BASE_URL}/api/agents`);
    return data;
  },
  createAgent: async (agent) => {
    const { data } = await axios.post(`${API_BASE_URL}/api/agents`, agent);
    return data;
  },

  // List Management
  getLists: async () => {
    const { data } = await axios.get(`${API_BASE_URL}/api/lists`);
    return data;
  },
  uploadCSV: async (file) => {
    const formData = new FormData();
    formData.append("csv", file);

    const { data } = await axios.post(`${API_BASE_URL}/api/lists/upload`, formData);
    return data;
  },
};