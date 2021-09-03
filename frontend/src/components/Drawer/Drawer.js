import React from 'react';
import { withState } from '../../airbnb-context';
import { NavLink } from 'react-router-dom';
import { LOGOUT } from '../../store/actionTypes';
import './Drawer.css';

function Drawer(props) {
    return (
        <div className="drawer" onClick={props.onClick}>
            <ul>
                {!props.state.userId && <li className="navigation__item">
                    <NavLink to="/login">Login</NavLink>
                </li>}
                {!props.state.userId && <li className="navigation__item">
                    <NavLink to="/signup">Signup</NavLink>
                </li>}
                {props.state.userId && <li className="navigation__item">
                    <p onClick={() => { props.dispatch({ type: LOGOUT }) }}>Logout</p>
                </li>}
                {props.state.userId && <li className="navigation__item">
                    <NavLink to="/host">Host</NavLink>
                </li>}
                {props.state.userId && <li className="navigation__item">
                    <NavLink to="/orders">Orders</NavLink>
                </li>}
            </ul>
        </div>
    );
}

export default withState(Drawer);