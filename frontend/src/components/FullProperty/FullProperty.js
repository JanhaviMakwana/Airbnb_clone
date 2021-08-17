import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {Button} from '@material-ui/core';
import ImageCarousel from '../Carousel/Carousel';
import StarIcon from '@material-ui/icons/Star';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import axios from '../../axios';
import './FullProperty.css';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


function FullProperty(props) {

    const [property, setProperty] = useState();
    const { propertyId } = props.match.params;
    const images = new Array(14).fill(1);
    useEffect(() => {
        const fetch = async () => {
            const fullProperty = await axios.get(`/get-property/${propertyId}`);
            console.log(fullProperty.data);
            setProperty(fullProperty.data);
        }
        fetch();
    }, [propertyId])

    const bookHandler = () => {
        console.log("click");
        console.log(propertyId);
        props.history.push({
            pathname: `/book/${propertyId}`,
            state: { property: property }
        })
    }

    return (
        <React.Fragment>
            {property && <div className="fullProperty">
                <div className="property__info">
                    <div className="property__head">
                        <p className="property__title">
                            {property.title}
                        </p>
                        <p className="property__star">
                            {property.star}<StarIcon />
                        </p>
                    </div>
                    <p className="property__description">{property.description}</p>

                    <p className="property__location">
                        <LocationOnIcon />
                        {property.location}
                    </p>
                    <p className="property_facilities">
                        {property.facilities.map((d, index) => {
                            return index + 1 === property.facilities.length ? ` ${d} ` : ` ${d} -`
                        })}
                    </p>

                    <Button variant="contained" color="primary"  onClick={bookHandler}>Book</Button>
                </div>
                <Carousel responsive={responsive} infinite={true} partialVisbile={false} style={{
                    height: '350px', width: '100%',
                    margin: '0 20px'
                }}>
                    {images.map((image, index) => {
                        return <ImageCarousel key={index} image={require(`../../assets/P_1/${index + 1}.jpg`).default} />
                    })}
                </Carousel>
            </div>}
        </React.Fragment>
    );
}

export default withRouter(FullProperty);