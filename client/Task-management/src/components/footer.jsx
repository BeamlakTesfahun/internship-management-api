import React from 'react';
import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const git  = () => {
  return (
    <footer className="footer">
      {/* Company Information */}
      <div className="footer-section company-info">
        <h3>InterTechHub</h3>
        <p>
          InterTechHub is a dynamic platform empowering <br />
          the next generation of developers through internships, <br />
          mentorships, and global opportunities.
        </p>
      </div>

      {/* Quick Links */}
      <div className="footer-section quick-links">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </div>

      {/* Social Media Links */}
      <div className="footer-section social-media">
        <h4>Follow Us</h4>
        <div className="social-icons">
          <a href="https://intertechub.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://www.youtube.com/@intertechub" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
          <a href="https://www.instagram.com/intertechub/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
         
          
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} InterTechHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
