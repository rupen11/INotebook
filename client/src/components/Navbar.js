import React from 'react'
import { useHistory } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom'

const Navbar = (props) => {
    let history = useHistory();
    const logoutUser = () => {
        localStorage.removeItem('token');
        props.showAlert("Logout Successfully", "success");
        history.push("/login");
    }

    let location = useLocation();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#004d66" }}>
                <Link className="navbar-brand" to="#"><span style={{ fontFamily: "serif" }}>I</span> Note <span style={{ fontFamily: "serif" }}>Book</span></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className={`nav-item ${location.pathname === "/" && "active"}`}>
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className={`nav-item ${location.pathname === "/notes" && "active"}`}>
                            <Link className="nav-link" to="/notes">Notes</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === "/about" && "active"}`}>
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === "/favourite" && "active"}`}>
                            <Link className="nav-link" to="/favourite">Favourite</Link>
                        </li>
                        {
                            localStorage.getItem('token') ?
                                <li className={`nav-item ${location.pathname === "/logout" && "active"}`}>
                                    <Link className="nav-link" to="/login" onClick={logoutUser}>Logout</Link>
                                </li> :
                                <>
                                    <li className={`nav-item ${location.pathname === "/login" && "active"}`}>
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className={`nav-item ${location.pathname === "/signup" && "active"}`}>
                                        <Link className="nav-link" to="/signup">Signup</Link>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
