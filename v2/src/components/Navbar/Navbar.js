import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-text">GAURISH MEHRA</span>
          <span className="logo-dot"></span>
        </div>
        
        <div className={`menu-icon ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="intro" spy={true} smooth={true} offset={-70} duration={500} onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="about" spy={true} smooth={true} offset={-70} duration={500} onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="thoughts" spy={true} smooth={true} offset={-70} duration={500} onClick={() => setMenuOpen(false)}>
              Thoughts
            </Link>
          </li>
          <li className="nav-item">
            <Link to="projects" spy={true} smooth={true} offset={-70} duration={500} onClick={() => setMenuOpen(false)}>
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link to="contact" spy={true} smooth={true} offset={-70} duration={500} onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;