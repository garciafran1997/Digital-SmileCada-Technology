import React from 'react';
import './Navbar.css';

const Navbar = ({ onCtaClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#home" className="navbar-logo">
          <img src="/logo.png" alt="SmileCAD Digital Design" />
        </a>
        <ul className="navbar-links">
          <li><a href="#software">SOFTWARE</a></li>
          <li><a href="#biblioteca">BIBLIOTECA</a></li>
          <li><a href="#academy">ACADEMY</a></li>
          <li><a href="#lab">DIGITAL SMILECAD TECHNOLOGY</a></li>
          <li><a href="#novedades">NOVEDADES</a></li>
        </ul>
        <button className="navbar-cta" onClick={onCtaClick}>ENVIAR TRABAJO</button>
      </div>
    </nav>
  );
};

export default Navbar;
