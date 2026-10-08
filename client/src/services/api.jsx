import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL?.trim();
const hasValidApiBaseUrl = (() => {
  if (!apiBaseUrl) return false;

  try {
    const url = new URL(apiBaseUrl);
    return (
      ["http:", "https:"].includes(url.protocol) &&
      /\/api\/?$/.test(url.pathname)
    );
  } catch {
    return false;
  }
})();

const API = axios.create({
  baseURL: apiBaseUrl,
});

API.interceptors.request.use((config) => {
  if (!hasValidApiBaseUrl) {
    throw new Error(
      "VITE_API_URL must be an absolute backend URL ending in /api.",
    );
  }

  return config;
});

// GET all books
export const getBooks = async () => {
  const { data } = await API.get("/books");

  if (!Array.isArray(data)) {
    throw new Error(
      "The books API returned an unexpected response. Expected an array from GET /api/books; verify VITE_API_URL points to the backend.",
    );
  }

  return data;
};

// GET single book
export const getBookById = (id) => API.get(`/books/${id}`);

// CREATE book
export const createBook = (data) => API.post("/books", data);

// UPDATE book
export const updateBook = (id, data) => API.put(`/books/${id}`, data);

// DELETE book
export const deleteBook = (id) => API.delete(`/books/${id}`);
