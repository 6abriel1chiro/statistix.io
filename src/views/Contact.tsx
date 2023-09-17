import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

import "./ContactStyles.css"

// Import the Font Awesome icons you need
import { FaEnvelope, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

// ...

const Contact: React.FC = () => {
  return (
    <React.Fragment>
      <Navbar />
      <h2 className="tools-title">Contact us</h2>
      <section className="contact-info">
        <div className="contact-item">
          <FaEnvelope className="icon" />
          <div>
            Email: <a href="mailto:ichiro6864@gmail.com" target="_blank">gabriel.balderrama@ucb.edu.bo</a>
          </div>
        </div>
        <div className="contact-item">
          <FaLinkedin className="icon" />
          <div>
            LinkedIn: <a href="https://www.linkedin.com/in/gabriel-ichiro/" target="_blank">Gabriel Ichiro</a>
          </div>
        </div>
        <div className="contact-item">
          <FaTwitter className="icon" />
          <div>
            Twitter: <a href="https://twitter.com/6abriel1chiro" target="_blank">6abriel1chiro</a>
          </div>
        </div>

        <div className="contact-item">
          <FaInstagram className="icon" />
          <div>
            Instagram: <a href="https://www.instagram.com/6abriel1chiro" target="_blank">6abriel1chiro</a>
          </div>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default Contact;
