import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-5">
      <div className="container">
        <div className="row">
          {/* Brand / Logo */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">TechSphere</h5>
            <p className="small">
              La tua fonte affidabile per confrontare e scoprire smartphone.
            </p>
          </div>

          {/* Link utili */}
          <div className="col-md-4 mb-3">
            <h6 className="text-uppercase">Link Utili</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/about" className="text-light text-decoration-none">
                  Chi siamo
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-decoration-none">
                  Contatti
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-light text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-light text-decoration-none">
                  Termini e Condizioni
                </Link>
              </li>
            </ul>
          </div>

          {/* Social media */}
          <div className="col-md-4 mb-3">
            <h6 className="text-uppercase">Seguici</h6>
            <div className="d-flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-light"
              >
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-light"
              >
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-light"
              >
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-light"
              >
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="border-light" />
        <div className="text-center small">
          &copy; {new Date().getFullYear()} TechSphere. Tutti i diritti
          riservati.
        </div>
      </div>
    </footer>
  );
}
