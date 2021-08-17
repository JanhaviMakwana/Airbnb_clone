const Order = require('../models/order');
const mongoose = require('mongoose');

exports.orderPlace = async (req, res) => {
    if (!req.isAuth) {
        throw new Error('Not authenticated !')
    }

    try {
        let { propertyId } = req.params;
        propertyId = mongoose.Types.ObjectId(propertyId);
        const userId = req.userId;
        const { address, contactNo, price, days, nights, paymentMode } = req.body;

        const order = new Order({
            address: address,
            contactNo: contactNo,
            price: price,
            days: days,
            nights: nights,
            paymentMode: paymentMode,
            userId: userId,
            propertyId: propertyId
        });

        const createdOrder = await order.save();
        return res.send({
            ...createdOrder._doc,
            _id: createdOrder._id.toString(),
            userId: createdOrder.userId.toString(),
            propertyId: createdOrder.propertyId.toString(),
            createdAt: createdOrder.createdAt.toISOString(),
            updatedAt: createdOrder.updatedAt.toISOString()
        })
    } catch (e) {
        console.log(e);
    }
}

exports.getOrders = async (req, res) => {
    try {

        const orders = await Order.find();
        if (!orders) {
            throw new Error('Error while fetching order !')
        }
        return res.send({
            orders: orders.map(order => {
                return {
                    ...order._doc,
                    _id: order._id.toString(),
                    userId: order.userId.toString(),
                    propertyId: order.propertyId.toString(),
                    createdAt: order.createdAt.toISOString(),
                    updatedAt: order.updatedAt.toISOString()
                }
            })
        });

    } catch (e) {
        console.log(e);
    }
}