import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

// Authentication

export const login = (data) =>
    api.post("/login", data);

export const register = (data) =>
    api.post("/signup", data);

export const logout = () =>
    api.delete("/logout");

export const checkSession = () =>
    api.get("/check_session");

// Incident APIs

export const getIncidents = () =>
    api.get("/incidents");

export const getIncident = (id) =>
    api.get(`/incidents/${id}`);

export const createIncident = (data) =>
    api.post("/incidents", data);

export const updateIncident = (id, data) =>
    api.patch(`/incidents/${id}`, data);

export const deleteIncident = (id) =>
    api.delete(`/incidents/${id}`);

// AI

export const generateAI = (id, question) =>
    api.post(`/incidents/${id}/ai`, {
        question
    });

export default api;