import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { withRouter } from 'react-router-dom';
import { Button, Input, FormControl, FormLabel } from '@material-ui/core';
import { withState } from '../../airbnb-context';
import './Book.css';

function Book(props) {

    const [userId, setUserId] = useState();
    const [orderData, setOrderData] = useState({
        address: '',
        contactNo: '',
        paymentMode: '',
        price: '',
        days: 1,
        nights: 1
    });
    const { property } = props.location.state;

    useEffect(() => {
        /*  console.log(props.state.userId);
         console.log(props);
         if (!props.state.userId) {
             props.history.replace('/login');
         } else {
             setUserId(props.state.userId);
             const formData = { ...orderData, price: property.price }
             setOrderData(formData);
         } */
    }, []);

    const nightChangeHandler = (type) => {
        const formData = { ...orderData }
        if (type === 'ADD') {
            formData['nights'] += 1;
            formData['price'] += property.price / 2;

        } else if (type === 'REMOVE') {
            formData['nights'] -= 1;
            formData['price'] -= property.price / 2;
        } else {

        }
        setOrderData(formData);
    }

    const dayChangeHandler = (type) => {
        const formData = { ...orderData }
        if (type === 'ADD') {
            formData['days'] += 1;
            formData['price'] += property.price / 2;

        } else if (type === 'REMOVE') {
            formData['days'] -= 1;
            formData['price'] -= property.price / 2;
        } else {

        }
        setOrderData(formData);
    }

    const orderDataHandler = (event) => {
        const formData = { ...orderData, [event.target.name]: event.target.value };
        setOrderData(formData);
    }

    const placeOrderHandler = (event) => {
        event.preventDefault();
        axios
            .post(`/order-place/${property._id}`, orderData, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            .then(res => {
                console.log(res);
                props.history.replace('/orders');
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="book">
            {/*   <p>Book</p> */}
            <FormControl onSubmit={placeOrderHandler}>
                <div className="book_form__control">
                    <FormLabel>User</FormLabel>
                    <Input fullWidth value={userId} disabled />
                </div>
                <div className="book_form__control">

                    <FormLabel>PropertyId</FormLabel>
                    <Input fullWidth value={property._id} disabled />
                </div>
                <div className="book_form__control">
                    <FormLabel>Address</FormLabel>
                    <Input fullWidth required value={orderData.address} placeholder="address" name="address" onChange={orderDataHandler} />
                </div>
                <div className="book_form__control">
                    <FormLabel>Contact No</FormLabel>
                    <Input fullWidth required value={orderData.contactNo} placeholder="contact no" name="contactNo" onChange={orderDataHandler} />
                </div>
                <div className="book_form__control">
                    <FormLabel>Payment Type</FormLabel>
                    <Input fullWidth required value={orderData.paymentMode} placeholder="payment mode" name="paymentMode" onChange={orderDataHandler} />
                </div>
                <div className="book_form__control">
                    <FormLabel>Price</FormLabel>
                    <Input fullWidth placeholder="price" disabled value={orderData.price} />
                </div>
                <div className="book_form__control time">
                    <FormLabel>Nights</FormLabel>
                    <Button variant="outlined"
                        color="primary"
                        type="button"
                        disabled={orderData.nights <= 1}
                        onClick={() => nightChangeHandler('REMOVE')}>
                        remove
                    </Button>
                    <Input fullWidth value={orderData.nights} disabled />
                    <Button variant="outlined"
                        color="primary" type="button" onClick={() => nightChangeHandler('ADD')}>add</Button>
                </div>

                <div className="book_form__control time">
                    <FormLabel>Days</FormLabel>
                    <Button
                        variant="outlined"
                        color="primary"
                        type="button"
                        disabled={orderData.days <= 1}
                        onClick={() => dayChangeHandler('REMOVE')}>
                        remove
                    </Button>
                    <Input fullWidth value={orderData.days} disabled />
                    <Button variant="outlined"
                        color="primary" type="button" onClick={() => dayChangeHandler('ADD')}>add</Button>
                </div>
                <Button variant="contained" color="primary" type="submit">Place Order</Button>
            </FormControl>
            <Button variant="contained" fullWidth color="secondary" onClick={props.history.goBack}>Cancel</Button>
        </div>
    );
}

export default withRouter(withState(Book));