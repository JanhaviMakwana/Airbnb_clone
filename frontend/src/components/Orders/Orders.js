import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { withState } from '../../airbnb-context';
import { SET_ERROR } from '../../store/actionTypes';
import moment from 'moment'
import './Orders.css';

function Orders(props) {

    const [orders, setOrders] = useState();
    const {dispatch} = props;

    useEffect(() => {

        axios.get('/orders', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            .then(res => {
                setOrders(res.data.orders);
            })
            .catch(e => {
               
                dispatch({ type: SET_ERROR, error: e });
            })
        // eslint-disable-next-line
    }, [])

    return (
        <div className="orders">

            {orders && orders.map(order => {
                return <div className="order" key={order._id} >
                    <p className="order__date">{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <p className="order__property"><span>PropertyId:</span> {order.propertyId}</p>
                    <p className="order__days">{`For ${order.days} day/night`}</p>
                    <p className="order__paymentMode">{order.paymentMode}</p>
                    <p className="order__price"> {order.price}$ </p>

                </div>
            })}
        </div>
    );
}

export default withState(Orders);