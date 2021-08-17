import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import './Orders.css';

function Orders() {

    const [orders, setOrders] = useState();

    useEffect(() => {
        const fetch = async () => {
            const fetchedOrders = await axios.get('/orders', { headers: { 'Authorization': localStorage.getItem('token') } })
            console.log(fetchedOrders.data.orders);
            setOrders(fetchedOrders.data.orders);
        }
        fetch();
    }, [])

    return (
        <div className="orders">
           
            {orders && orders.map(order => {
                return <div key={order._id} style={{border: '1px solid black'}}>
                    <p>{order.createdAt}</p>
                    <p>{`${order.days} days ${order.nights} nights`}</p>
                    <p>Payment mode: {order.paymentMode}</p>
                    <p>Amount: {order.price}$</p>
                    <p>PropertyId: {order.propertyId}</p>
                </div>
            })}
        </div>
    );
}

export default Orders;