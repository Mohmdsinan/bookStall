import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h4>BookStore</h4>
          <p>Discover your next favorite book from our curated collection.</p>
        </div>

        <div className="footer-section">
          <h5>Quick Links</h5>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/explore">Explore</a>
            </li>
            <li>
              <a href="/manage">Manage</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h5>Follow Us</h5>
          <div className="social-links">
            <a href="#" aria-label="Twitter">
              𝕏
            </a>
            <a href="#" aria-label="Facebook">
              f
            </a>
            <a href="#" aria-label="Instagram">
              📷
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {currentYear} BookStore. All rights reserved. Crafted with{" "}
          <span className="heart">❤️</span>
        </p>
      </div>
    </footer>
  );
}
