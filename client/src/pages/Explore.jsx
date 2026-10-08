import { useEffect, useState, useContext } from "react";
import { BooksContext } from "../context/BooksContext";
import BookCard from "../components/BookCard";
import "./Explore.css";

export default function Explore() {
  const { books, loading, error, fetchBooks } = useContext(BooksContext);
  const [search, setSearch] = useState("");

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="explore-page">
      <div className="container explore-header">
        <h1>Explore Books</h1>
        <p>Browse our curated collection of books across all genres.</p>
      </div>

      <div className="container explore-content">
        {/* Search Bar */}
        <div className="search-container">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        {!loading && !error && (
          <div className="results-info">
            <p>
              Showing <strong>{filtered.length}</strong> of{" "}
              <strong>{books.length}</strong> books
            </p>
          </div>
        )}

        {/* Books Grid */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading books...</p>
          </div>
        ) : error ? (
          <div className="empty-state">
            <h3>Unable to load books</h3>
            <p>{error}</p>
            <button className="btn-secondary" onClick={fetchBooks}>
              Retry
            </button>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid">
            {filtered.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No Books Found</h3>
            <p>
              {search
                ? `We couldn't find any books matching "${search}". Try a different search term.`
                : "No books available at the moment."}
            </p>
            {search && (
              <button className="btn-secondary" onClick={() => setSearch("")}>
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
