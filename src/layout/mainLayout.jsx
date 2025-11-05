// src/layout/MainLayout.jsx
import { useState } from "react";
import "../styles/MainLayout.css";

/**
 * MainLayout:
 * - Fixed Header with responsive nav
 * - Footer
 * - Body area for SecondaryLayout
 */
const MainLayout = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <header className="main-header">
        <div className="container header-content">
          <a href="/" className="logo">DVYB</a>
          <button
            className="nav-toggle"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation"
          >
            Menu
          </button>
          <nav className={`nav ${navOpen ? "open" : ""}`}>
            <a href="/">Home</a>
            <a href="/womenwear">Womenwear</a>
          </nav>
        </div>
      </header>

      {/* Body */}
      <main style={{ flex: 1, paddingTop: "80px" }}>
        {children}
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container footer-content">
          © 2025 DVYB. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;