import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import Card from '../Card/Card';
import Banner from '../Banner/Banner';
import './Home.css';

function Home() {

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const fetchedProperties = await axios.get('/get-properties')
            console.log(fetchedProperties.data);
            setProperties(fetchedProperties.data.properties);
        }
        fetch();
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
                      return  <Card
                            key={index}
                            src={`http://localhost:8080/${property.image}`}
                            title={property.title}
                            description={property.description}
                            price={property.price+ '$'}
                        />
                    })
                }
            </div>
        </div>
    );
}

export default Home;