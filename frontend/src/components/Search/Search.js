import React, { useState } from 'react';
import { Button, MenuItem, Menu, Fade } from '@material-ui/core';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import './Search.css';

function Search(props) {

    const [startDate, setStartDate] = useState(new Date());
    const ref = React.createRef(null);
    const [endDate, setEndDate] = useState(new Date());
    const [city, setCity] = useState('');
    const [enchorEl, setEnchorEl] = useState(null);
    const open = Boolean(enchorEl);

    const searchHandler = () => {
        console.log("click");
        const filter = {
            startDate: startDate,
            endDate: endDate,
            city: city
        }
        props.history.push({
            pathname: '/search',
            state: {
                filter: filter
            }
        })

    }
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    const cityHandler = (cityname) => {
        setCity(cityname);
        setEnchorEl(null);
    }

    return (
        <div className="search">
            <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} minDate={new Date()} />
            <div>
                <p>days: {((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000) + 1}</p>
 
            </div>
            
            <div>
                <Button aria-controls="city-menu" aria-haspopup="true" onClick={(event) => setEnchorEl(event.currentTarget)}>Search City</Button>
                <Menu ref={ref} id="city-menu" anchorEl={enchorEl} open={open} keepMounted TransitionComponent={Fade} onClose={() => setEnchorEl(null)}>
                    <MenuItem onClick={() => cityHandler('ahmedabad')}>Ahmedabad</MenuItem>
                    <MenuItem onClick={() => cityHandler('surat')}>Surat</MenuItem>
                    <MenuItem onClick={() => cityHandler('mumbai')}>Mumbai</MenuItem>
                    <MenuItem onClick={() => cityHandler('gandhinagar')}>Gandhinagar</MenuItem>
                </Menu>
            </div>
            <Button onClick={searchHandler}>Search AirBnb</Button>

        </div>
    );
};

export default withRouter(Search);