import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardMedia } from '@material-ui/core';

const styles = makeStyles((theme) => ({
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        marginBottom: 0,
        margin: '0 5px'
    },
    media: {
        height: '100%',
        width: '100%',
    }
})); 

function ImageCarousel({ image }) {
     const classes = styles(); 
    return (
        <Card >
            <CardMedia className={classes.media}> 
                <img src={image} className={classes.image}    alt=""/>
             </CardMedia>
        </Card>
    );
}

export default ImageCarousel;