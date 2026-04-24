import { createContext, useState, useCallback } from "react";
import { getBooks, createBook, updateBook, deleteBook } from "../services/api";

export const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all books from API
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create book with optimistic update
  const addBook = useCallback(
    async (formData) => {
      try {
        // Optimistic update: add to UI immediately
        const tempId = `temp_${Date.now()}`;
        const optimisticBook = { ...formData, _id: tempId };
        setBooks((prev) => [...prev, optimisticBook]);

        // API call
        const res = await createBook(formData);

        // Replace temp book with actual server response
        setBooks((prev) => prev.map((b) => (b._id === tempId ? res.data : b)));
        return res.data;
      } catch (err) {
        setError(err.message);
        // Revert optimistic update on error
        fetchBooks();
        throw err;
      }
    },
    [fetchBooks],
  );

  // Update book with optimistic update
  const editBook = useCallback(
    async (id, formData) => {
      try {
        // Optimistic update
        const oldBooks = books;
        setBooks((prev) =>
          prev.map((b) => (b._id === id ? { ...b, ...formData } : b)),
        );

        // API call
        const res = await updateBook(id, formData);

        // Ensure UI has the exact server response
        setBooks((prev) => prev.map((b) => (b._id === id ? res.data : b)));
        return res.data;
      } catch (err) {
        setError(err.message);
        // Revert optimistic update on error
        fetchBooks();
        throw err;
      }
    },
    [books, fetchBooks],
  );

  // Delete book with optimistic update
  const removeBook = useCallback(
    async (id) => {
      try {
        // Optimistic update
        const oldBooks = books;
        setBooks((prev) => prev.filter((b) => b._id !== id));

        // API call
        await deleteBook(id);
      } catch (err) {
        setError(err.message);
        // Revert optimistic update on error
        setBooks(oldBooks);
        throw err;
      }
    },
    [books],
  );

  return (
    <BooksContext.Provider
      value={{
        books,
        loading,
        error,
        fetchBooks,
        addBook,
        editBook,
        removeBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}
