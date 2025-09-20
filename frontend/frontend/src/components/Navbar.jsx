

import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const getUserName = () => {
    if (!user) return "";
    return user.name || user.email.split("@")[0];
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark glass-nav sticky-top">
      <div className="container">
        <NavLink to="/" className="navbar-brand fw-bold text-info">
          MindBloom
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => `nav-link fw-bold ${isActive ? "active-nav" : ""}`}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/features"
                className={({ isActive }) => `nav-link fw-bold ${isActive ? "active-nav" : ""}`}
              >
                Features
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) => `nav-link fw-bold ${isActive ? "active-nav" : ""}`}
              >
                About
              </NavLink>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/profile"
                    className={({ isActive }) => `nav-link fw-bold ${isActive ? "active-nav" : ""}`}
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {getUserName()}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink className="btn btn-gradient ms-2" to="/signUp">
                  Sign Up
                </NavLink>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;