import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { withState } from '../../airbnb-context';
import { Button } from '@material-ui/core';
import { SET_ERROR } from '../../store/actionTypes';
import Card from '../Card/Card';
import Banner from '../Banner/Banner';
import './Home.css';

function Home(props) {

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        axios.get('/get-properties')
            .then(res => {
                setProperties(res.data.properties);
            })
            .catch(err => {
                props.dispatch({ type: SET_ERROR, error: err })
            })
        // eslint-disable-next-line
    }, [])

    return (
        <div className="home">

            <Banner />
            <div className='home__section'>
                {properties && properties.slice(0, 3).map((property, index) => {
                    return <Card
                        key={index}
                        src={`http://localhost:8080/${property.image}`}
                        title={property.title}
                        description={property.description}
                    />
                })}
            </div>
            <div className='home__section'>
                {
                    properties && properties.slice(3, 6).map((property, index) => {
                        return <Card
                            key={index}
                            src={`http://localhost:8080/${property.image}`}
                            title={property.title}
                            description={property.description}
                            price={property.price + '$'}
                        />
                    })
                }
            </div>
        </div>
    );
}

export default withState(Home);