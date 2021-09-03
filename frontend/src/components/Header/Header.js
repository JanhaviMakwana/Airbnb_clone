import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Drawer from '../Drawer/Drawer';
import SearchIcon from '@material-ui/icons/Search';
import LanguageIcon from '@material-ui/icons/Language';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Header.css';

function Header(props) {
    const [showDrawer, setShowDrawer] = useState(false);

    const searchHandler = (event) => {
        const keyword = event.target.value;
        props.history.replace(`/search?keyword=${keyword}`);

    }

    return (
        <div className="header">
            <Link to="/">
                <img
                    className="header__icon"
                    src="https://i.pinimg.com/originals/3c/bf/be/3cbfbe148597341fa56f2f87ade90956.png"
                    alt=""
                />
            </Link>
            <div className="header__center">
                <input
                    type="text"
                    onChange={searchHandler}
                />
                <SearchIcon />
            </div>
            <div className="header__right">
                <div className="header__icons">
                    <p>Become a host</p>
                    <LanguageIcon />
                    <ExpandMoreIcon onClick={() => setShowDrawer(!showDrawer)} />
                    <AccountCircleIcon />
                </div>
                <div className="header__drawer">
                    {showDrawer && <Drawer onClick={() => setShowDrawer(!showDrawer)} />}
                </div>
            </div>

        </div>
    )
}

export default withRouter(Header);