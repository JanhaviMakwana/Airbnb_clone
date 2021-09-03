import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { withRouter } from 'react-router-dom';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { SET_ERROR } from '../../store/actionTypes';
import { Button, Input, FormLabel } from '@material-ui/core';
import { withState } from '../../airbnb-context';
import './Book.css';

function Book(props) {

    const userId = props.state.userId ? props.state.userId : '';
    const [occupiedDates, setOccupiedDates] = useState([]);
    const { property } = props.location.state;
    const [orderData, setOrderData] = useState({
        address: '',
        contactNo: '',
        paymentMode: '',
        price: property.price,
        days: 1
    });
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    useEffect(() => {

        let temp = []
        property.booking && property.booking.map(d => {

            const days = Math.abs((new Date(d.endDate).getDay() - new Date(d.startDate).getDay()+1));
            console.log(days);
            console.log(d.startDate);
            console.log(d.endDate);
            const array = new Array(days).fill(1);
            array.map((ar, index) => {
              
                const d1 = new Date(d.startDate)
                console.log(new Date(d1.getFullYear(), d1.getMonth(), d1.getDate() + (index-1)));
                return temp.push(new Date(d1.getFullYear(), d1.getMonth(), d1.getDate() + (index-1)))
            })
            console.log(array);
            

        });
        console.log(temp)
        setOccupiedDates(temp)
       
        /*  setOccupiedDates(occupiedDates); */
    }, [setOccupiedDates])
    const orderDataHandler = (event) => {
        const formData = { ...orderData, [event.target.name]: event.target.value };
        setOrderData(formData);
    };

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
        const formData = {
            ...orderData,
            days: ((new Date(ranges.selection.endDate).getTime() - new Date(ranges.selection.startDate).getTime()) / 86400000) + 1
        };
        setOrderData(formData);
    };

    const placeOrderHandler = (event) => {
        event.preventDefault();
        const formData = { ...orderData, startDate: startDate, endDate: endDate };
        axios
            .post(`/order-place/${property._id}`, formData, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            .then(() => {
                props.history.replace('/orders');
            })
            .catch(err => {
                props.dispatch({ type: SET_ERROR, error: err });
            })
    }




    return (
        <div style={{ display: 'inline-flex' }}>
            <div className="book">
                <form onSubmit={placeOrderHandler}>
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
                    <div className="book_form__control">
                        <FormLabel>Days</FormLabel>
                        <Input fullWidth placeholder="days" disabled value={orderData.days} />
                    </div>


                    <Button type="submit" variant="contained" color="primary" >Place Order</Button>
                </form>
                <Button variant="contained" fullWidth color="secondary" onClick={props.history.goBack}>Cancel</Button>
            </div>
            <div>
                <DateRangePicker
                    disabledDates={occupiedDates}
                    ranges={[selectionRange]}
                    onChange={handleSelect} minDate={new Date()} />
            </div>
        </div>
    );
}

export default withRouter(withState(Book));