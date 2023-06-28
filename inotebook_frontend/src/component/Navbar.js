import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('./login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex">
                <a className="navbar-brand" href="/">
                    iNotebook
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className={`nav-item ${location.pathname === "/home" ? "active" : ""}`}>
                            <Link className="nav-link" to="/home">
                                Home <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/notes" ? "active" : ""}`} to="/notes">
                                Notes
                            </Link>
                        </li>
                    </ul>
                    <div className="ml-auto p-2">
                        {!localStorage.getItem('token') ?
                            <div>
                                <Link className="  btn btn-primary mx-2" to="/login">Login</Link>
                                <Link className=" btn btn-primary" to="/signup">SignUp</Link>
                            </div> : <button className="  btn btn-primary mx-2" onClick={handleLogout}>LogOut</button>}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
