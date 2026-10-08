import { useEffect, useState, useContext } from "react";
import { BooksContext } from "../context/BooksContext";
import "./ManageBooks.css";

export default function ManageBooks() {
  const { books, fetchBooks, addBook, editBook, removeBook } =
    useContext(BooksContext);
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.author || !form.price) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (editId) {
        await editBook(editId, form);
        setSuccess("Book updated successfully!");
      } else {
        await addBook(form);
        setSuccess("Book added successfully!");
      }

      // Reset form
      setForm({
        title: "",
        author: "",
        price: "",
        description: "",
        image: "",
      });
      setEditId(null);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || "Failed to save book");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (book) => {
    setForm(book);
    setEditId(book._id);
    window.scrollTo(0, 0);
  };

  const handleCancel = () => {
    setForm({
      title: "",
      author: "",
      price: "",
      description: "",
      image: "",
    });
    setEditId(null);
    setError(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await removeBook(id);
      setSuccess("Book deleted successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete book");
    }
  };

  return (
    <div className="manage-page">
      <div className="manage-header container">
        <h1>Manage Books</h1>
        <p>Add, edit, or delete book from collections.</p>
      </div>

      <div className="container manage-content">
        {/* Form Section */}
        <div className="manage-form-section">
          <h2>{editId ? "Edit Book" : "Add New Book"}</h2>

          {error && <div className="alert alert-error">❌ {error}</div>}
          {success && <div className="alert alert-success">✓ {success}</div>}

          <form className="manage-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Book Title *</label>
              <input
                id="title"
                type="text"
                placeholder="Enter book title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author *</label>
              <input
                id="author"
                type="text"
                placeholder="Enter author name"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price (₹) *</label>
                <input
                  id="price"
                  type="number"
                  placeholder="Enter price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  id="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Enter book description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Saving..." : editId ? "Update Book" : "Add Book"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Books List Section */}
        <div className="manage-list-section">
          <h2>Books ({books.length})</h2>

          {books.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <p>No books yet. Add your first book using the form above.</p>
            </div>
          ) : (
            <div className="books-table-responsive">
              <table className="books-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book._id}>
                      <td>
                        <div className="book-title-cell">
                          {book.image && (
                            <img
                              src={book.image}
                              alt={book.title}
                              className="book-thumbnail"
                            />
                          )}
                          <span>{book.title}</span>
                        </div>
                      </td>
                      <td>{book.author}</td>
                      <td>
                        <span className="price-badge">₹{book.price}</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn-sm btn-secondary"
                            onClick={() => handleEdit(book)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn-sm btn-danger"
                            onClick={() => handleDelete(book._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
