import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookById } from "../services/api";
import "./BookDetails.css";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBookById(id)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load book details");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="details-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="details-container">
        <div className="empty-state">
          <h2>⚠️ Book Not Found</h2>
          <p>
            {error ||
              "The book you're looking for doesn't exist or was removed."}
          </p>
          <button className="btn-primary" onClick={() => navigate("/explore")}>
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="details-page">
      <div className="details-container container">
        <button className="back-button" onClick={() => navigate("/explore")}>
          ← Back to Explore
        </button>

        <div className="details-content">
          {/* Book Image */}
          <div className="details-image">
            {book.image ? (
              <img src={book.image} alt={book.title} />
            ) : (
              <div className="image-placeholder">
                <span>📚</span>
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="details-info">
            <div className="details-header">
              <h1>{book.title}</h1>
              <p className="author">by {book.author}</p>
            </div>

            <div className="price-section">
              <span className="price">₹{book.price}</span>
              <button className="btn-primary btn-lg">Add to Cart</button>
            </div>

            <div className="divider"></div>

            <div className="description-section">
              <h3>About this book</h3>
              <p>{book.description || "No description available."}</p>
            </div>

            <div className="details-meta">
              <div className="meta-item">
                <span className="meta-label">Format</span>
                <span className="meta-value">Paperback</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Pages</span>
                <span className="meta-value">—</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Language</span>
                <span className="meta-value">English</span>
              </div>
            </div>

            <div className="action-buttons">
              <button
                className="btn-secondary"
                onClick={() => navigate("/explore")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
