// API service
const API_BASE_URL = "http://localhost:5000";

export const api = {
  signup: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error("Registration failed");
    return response.json();
  },
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error("Login failed");
    return response.json();
  },

  getAgents: async (token) => {
    const response = await fetch(`${API_BASE_URL}/api/agents`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to fetch agents");
    return response.json();
  },

  createAgent: async (agent, token) => {
    const response = await fetch(`${API_BASE_URL}/api/agents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(agent),
    });
    if (!response.ok) throw new Error("Failed to create agent");
    return response.json();
  },

  uploadCSV: async (file, token) => {
    const formData = new FormData();
    formData.append("csv", file);
    const response = await fetch(`${API_BASE_URL}/api/lists`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to upload CSV");
    return response.json();
  },

  getLists: async (token) => {
    const response = await fetch(`${API_BASE_URL}/api/lists`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to fetch lists");
    return response.json();
  },
};
