

import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "../App.css";

function Footer() {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h2 className="text-info fw-bold">MindBloom</h2>
            <p className="small text-light">Your partner in mental wellness</p>
          </div>

          <div className="col-md-4 d-flex justify-content-center mb-3 mb-md-0">
            <ul className="list-unstyled d-flex gap-4 mb-0">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/features" className="footer-link">Features</Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">About</Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4 d-flex justify-content-center justify-content-md-end gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaFacebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaXTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        <div className="text-center border-top border-secondary pt-3 mt-3 small">
          © {new Date().getFullYear()} Ritika Rathore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;