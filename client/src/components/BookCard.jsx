import { useNavigate } from "react-router-dom";
import "./BookCard.css";

export default function BookCard({ book }) {
  const navigate = useNavigate();

  return (
    <div
      className="book-card"
      onClick={() => navigate(`/books/${book._id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate(`/books/${book._id}`);
      }}
    >
      <div className="book-card-image">
        {book.image ? (
          <img src={book.image} alt={book.title} />
        ) : (
          <div className="book-placeholder">
            <span>📚</span>
          </div>
        )}
      </div>

      <div className="book-card-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>

        <div className="book-footer">
          <span className="book-price">₹{book.price}</span>
          <button
            className="book-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/books/${book._id}`);
            }}
          >
            View →
          </button>
        </div>
      </div>
    </div>
  );
}
