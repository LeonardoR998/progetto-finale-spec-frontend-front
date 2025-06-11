import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "1.8rem",
            fontWeight: "700",
            color: "#0d6efd",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          TechSphere
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fa-solid fa-house fa-lg"></i>
                </Link>
              </li>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/compare">
                <i className="fa-solid fa-clone fa-lg"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                <i className="fa-solid fa-star fa-lg"></i>
              </Link>
            </li>
          </ul>
          <form
            className="d-flex"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-primary" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
