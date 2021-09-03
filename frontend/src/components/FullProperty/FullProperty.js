import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { withState } from '../../airbnb-context';
import { SET_ERROR } from '../../store/actionTypes';
import { Button } from '@material-ui/core';
import ImageCarousel from '../Carousel/Carousel';
import StarIcon from '@material-ui/icons/Star';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import axios from '../../axios';
import './FullProperty.css';

const responsive = {
    superLargeDesktop: {
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
        axios.get(`/get-property/${propertyId}`).then(res => {
            setProperty(res.data)
        }).catch(e => {
            props.dispatch({ type: SET_ERROR, error: e });
        });
        // eslint-disable-next-line
    }, [propertyId])

    const bookHandler = () => {
        /* props.history.push({
            pathname: `/book/${propertyId}`,
            state: { property: property }
        }) */
         if (props.state.userId) { 
            props.history.push({
                pathname: `/book/${propertyId}`,
                state: { property: property }
            })
         } else {
            props.history.push('/login');
        }  
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

                    <Button variant="contained" color="primary" onClick={bookHandler}>Book</Button>
                </div>

                <Carousel responsive={responsive} infinite={true} partialVisbile={false} >
                    {images.map((image, index) => {
                        return <ImageCarousel key={index} image={require(`../../assets/P_1/${index + 1}.jpg`).default} />
                    })}
                </Carousel>
            </div>}
        </React.Fragment>
    );
}

export default withRouter(withState(FullProperty));