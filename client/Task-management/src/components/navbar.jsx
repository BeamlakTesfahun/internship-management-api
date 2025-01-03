import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../assets/logo.png';
import avatar from '../assets/user-avatar.png';

const Navbar = ({ role }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="navbar">
      {/* Logo and Company Name */}
      <div className="navbar-logo">
        <img src={logo} alt="InterTechHub Logo" className="logo" />
        <span className="company-name">InterTechHub</span>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? (
          <span className="close-icon">&times;</span> // X icon
        ) : (
          <span className="hamburger-icon">&#9776;</span> // Hamburger icon
        )}
      </div>

      {/* Navigation Links */}
      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        {role === 'admin' ? (
          <>
            <li><Link to="/Dashboard">Dashboard</Link></li>
            <li><Link to="/tasks/admin">Manage Tasks</Link></li>
            <li><Link to="/tracks">Manage Tracks</Link></li>
          </>
        ) : (
          <>
            {/* <li><Link to="/auth/login">Home</Link></li> */}
            <li><Link to="/tasks/student">My Tasks</Link></li>
          </>
        )}
      </ul>

      {/* User Avatar and Dropdown */}
      <div className="user-avatar" onClick={toggleDropdown}>
        <img src={avatar} alt="User Avatar" className="avatar" />
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <Link to={role === 'admin' ? '/admin-login' : '/auth/login'} className="dropdown-item">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;