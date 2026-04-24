import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>Discover Your Next Favorite Book</h1>
            <p>
              Explore thousands of books across all genres. From bestsellers to
              hidden gems, find your perfect read and dive into new worlds.
            </p>
            <button
              className="btn-primary btn-lg"
              onClick={() => navigate("/explore")}
            >
              Start Exploring
            </button>
          </div>

          <div className="hero-visual">
            <div className="book-stack">
              <div className="book book-1">
                <span>📖</span>
              </div>
              <div className="book book-2">
                <span>📕</span>
              </div>
              <div className="book book-3">
                <span>📗</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose BookStore?</h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Vast Collection</h3>
              <p>
                Thousands of books across all genres, from fiction to
                non-fiction, always updated with the latest releases.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Affordable Prices</h3>
              <p>
                Competitive pricing and regular discounts to make reading
                accessible to everyone.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Discovery</h3>
              <p>
                Powerful search and filtering tools to quickly find the perfect
                book for your mood.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Curated Picks</h3>
              <p>
                Expert recommendations and bestseller lists to help you discover
                your next page-turner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container cta-content">
          <h2>Ready to Start Reading?</h2>
          <p>Explore our collection and find your next favorite book today.</p>
          <button
            className="btn-primary btn-lg"
            onClick={() => navigate("/explore")}
          >
            Browse Books
          </button>
        </div>
      </section>
    </div>
  );
}
