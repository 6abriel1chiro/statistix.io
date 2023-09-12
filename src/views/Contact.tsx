import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import LinkedInIcon from '../assets/img/linkedin-in.svg';
import EmailIcon from '../assets/img/envelope-solid.svg';
import "./ContactStyles.css"


const Contact: React.FC = () => {
    return (
        <React.Fragment>
        <Navbar />
  
        <h2 className="tools-title">Contact us</h2>
        <section className="contact-info">
          <div className="contact-item">
            <img src={EmailIcon} alt="Email" style={{ width: '24px', height: '24px' }} /> Email: <a href="mailto:ichiro6864@gmail.com" target="_blank" >ichiro6864@gmail.com</a>
          </div>
          <div className="contact-item">
            <img src={LinkedInIcon} alt="LinkedIn" style={{ width: '24px', height: '24px' }} /> LinkedIn: <a href="https://www.linkedin.com/in/gabriel-ichiro/" target="_blank">Gabriel Ichiro</a>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  };
  
  
export default Contact;
