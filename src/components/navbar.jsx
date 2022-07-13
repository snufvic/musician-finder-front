import { Link, NavLink } from "react-router-dom";

function Navbar({ icon, user }) {
  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark bg-dark shadow-sm"
      aria-label="Third navbar example"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className={icon}></i> Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            {user ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/cards_list">
                  Search Musicians
                </NavLink>
              </li>
            ) : null}
            {user && user.access_level === 1 ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin Tab
                </NavLink>
              </li>
            ) : null}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="card">
                    Create/Update Card
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="logout">
                    Log Out
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="signin">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
