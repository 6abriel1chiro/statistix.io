import React, { Component } from "react";
import "./FooterStyles.css";
class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <p>Created by Gabriel Ichiro 2023</p>
        <div className="social-links">
          <a
            href="https://www.instagram.com/6abriel1chiro/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram: @6abriel1chiro
          </a>
          <a
            href="https://www.linkedin.com/in/gabriel-balderrama-vargas-9524001b5/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn: Gabriel (Ichiro)
          </a>
          <a
            href="https://www.tiktok.com/@gabriel1chiro"
            target="_blank"
            rel="noopener noreferrer"
          >
            TikTok: @gabriel1chiro
          </a>
        </div>
      </footer>
    );
  }
}
export default Footer;
