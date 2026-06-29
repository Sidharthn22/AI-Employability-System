import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <h2 className="logo">
          Smart Employability System
        </h2>

        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        <div
          ref={menuRef}
          className={`nav-links ${menuOpen ? "active" : ""}`}
        >
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/job-match" onClick={() => setMenuOpen(false)}>Job Match</Link>
          <Link to="/ats-checker" onClick={() => setMenuOpen(false)}>ATS Checker</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;