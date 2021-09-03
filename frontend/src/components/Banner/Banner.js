import React, { useState } from 'react';
import Search from '../Search/Search';
import { withRouter } from 'react-router-dom';
import './Banner.css';
import { Button } from '@material-ui/core';

function Banner(props) {

    const [showSearch, setShowSearch] = useState(true);

    const exploreHandler = () => {
        props.history.push('/search');
    }

    return (
        <div className="banner">
            <div className="banner__search">
                {showSearch && <Search/>}
                <Button onClick={() => setShowSearch(!showSearch)} variant="outlined">Search</Button>
            </div>
            <div className="banner__info">
                <h1>Get out and stretch your imagination</h1>
                <h5>
                    Plan a different kind of gateway to uncover the hidden gems near you.
                </h5>
                <Button
                    onClick={exploreHandler}
                    variant="outlined"
                >Explore Nearby</Button>
            </div>
        </div>
    );
}

export default withRouter(Banner);