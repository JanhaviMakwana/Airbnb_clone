import React from 'react';
import { NavLink } from 'react-router-dom';
import './Drawer.css';

function Drawer(props) {
    return (
        <div className="drawer" onClick={props.onClick}>
            <ul>
                <li className="navigation__item">
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li className="navigation__item">
                    <NavLink to="/signup">Signup</NavLink>
                </li>
                <li className="navigation__item">
                    <NavLink to="/host">Host</NavLink>
                </li>
                <li className="navigation__item">
                    <NavLink to="/orders">Orders</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Drawer;