import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
import logo from '../assets/logo.png'
import avator from '../assets/user-avatar.png'



const Navbar = ({ role }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="navbar">
      {/* Logo and Company Name */}
      <div className="navbar-logo">
        <img src= {logo} alt="InterTechHub Logo" className="logo" />
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
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/tasks">Manage Tasks</Link></li>
            <li><Link to="/admin/submissions">Submissions</Link></li>
            <li><Link to="/admin/students">Manage Students</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/student/home">Home</Link></li>
            <li><Link to="/student/tasks">My Tasks</Link></li>
            <li><Link to="/student/submissions">Submissions</Link></li>
          </>
        )}
      </ul>

      {/* User Profile */}
      <div className="navbar-profile" onClick={toggleDropdown}>
        <img src= {avator} alt="User Avatar" className="avatar" />
        {isDropdownOpen && (
          <div className="dropdown">
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>
            <button onClick={() => console.log('Logout clicked')}>Logout</button>
          </div>
        )}
      </div>
      
    </nav>
  );
};

export default Navbar;

