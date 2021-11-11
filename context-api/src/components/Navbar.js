import React from 'react'
import Proptypes from "prop-types";
import {Link} from "react-router-dom";

const Navbar = ({title}) => {
    return (
        <nav className="navbar-nav navbar-expand-lg navbar-dark bg-dark mb-3 p-3">
            <Link to="/" className="navbar-brand">{title}</Link>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/addUser" className="nav-link">Add User</Link>
                </li>
            </ul>
        </nav>
    )
}

Navbar.propTypes = {
    title : Proptypes.string.isRequired
}
Navbar.defaultProps = {
    title : "User App"
}

export default Navbar;
