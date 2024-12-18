import axios from "axios";
import { GET_ERROR, TOKEN } from "../utils/constants";

const BASE_URL = "http://localhost:5001/api";

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Add an Axios request interceptor to include the Bearer token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Helper function to perform a GET request using Axios.
 * @param {string} path - The API endpoint to send the GET request to.
 *
 * Example Usage:
 *
 * // Simple GET request
 * const data = await getRequest('/users');
 * console.log(data);
 *
 */

export const getRequest = async (path) => {
  try {
    let result = await api.get(path);
    return result.data;
  } catch (error) {
    return GET_ERROR(error);
  }
};

export const postRequest = async (path, body, isFormData = false) => {
  try {
    const headers = isFormData ? { "Content-Type": "multipart/form-data" } : {};
    const result = await api.post(path, body, { headers });
    return result.data;
  } catch (error) {
    return GET_ERROR(error);
  }
};

export const putRequest = async (path, body) => {
  try {
    const result = await api.put(path, body);
    return result.data;
  } catch (error) {
    return GET_ERROR(error);
  }
};

export const deleteRequest = async (path) => {
  try {
    const result = await api.delete(path);
    return result.data;
  } catch (error) {
    return GET_ERROR(error);
  }
};
