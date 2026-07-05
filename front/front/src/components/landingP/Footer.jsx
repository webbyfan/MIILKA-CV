import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-col">
            <div className="footer-logo">
              <div className="logo-box">M</div>
              <span className="logo-text">Milkaa CV</span>
            </div>
            <p className="footer-description">
              AI-powered resume builder for modern job seekers.
            </p>
          </div>

          {/* Product */}
          <div className="footer-col">
            <h4 className="footer-title">Product</h4>
            <ul className="footer-links">
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#ats">ATS Checker</a>
              </li>
              <li>
                <a href="#">Templates</a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-col">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Cookie Policy</a>
              </li>
              <li>
                <a href="#">Security</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2024 ResumeAI. All rights reserved.</p>
          </div>

          {/* Social Links */}
          <div className="footer-social">
            <a href="#" title="Twitter">
              𝕏
            </a>
            <a href="#" title="LinkedIn">
              in
            </a>
            <a href="#" title="GitHub">
              ⚙
            </a>
            <a href="#" title="Email">
              ✉
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
