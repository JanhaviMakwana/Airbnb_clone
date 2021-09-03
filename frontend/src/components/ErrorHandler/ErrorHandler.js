import React from 'react';
import { Button } from '@material-ui/core';
import { withState } from '../../airbnb-context';
import { REMOVE_ERROR } from '../../store/actionTypes';
import './ErrorHandler.css';

function ErrorHandler(props) {

    const errorHandler = () => {
        props.dispatch({ type: REMOVE_ERROR });
    }


    return (
        <div className="error">
            <p>{props.state.error.message}</p>
            <Button size="small" variant="outlined" onClick={errorHandler}>Accept</Button>
        </div>
    )
};

export default withState(ErrorHandler);