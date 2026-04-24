import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// GET all books
export const getBooks = () => API.get("/books");

// GET single book
export const getBookById = (id) => API.get(`/books/${id}`);

// CREATE book
export const createBook = (data) => API.post("/books", data);

// UPDATE book
export const updateBook = (id, data) => API.put(`/books/${id}`, data);

// DELETE book
export const deleteBook = (id) => API.delete(`/books/${id}`);