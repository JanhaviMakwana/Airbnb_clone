const Order = require('../models/order');
const Property = require('../models/property');
const moment = require('moment');
const mongoose = require('mongoose');

exports.orderPlace = async (req, res) => {
    if (!req.isAuth) {
        throw new Error('Not authenticated !')
    }

    try {
        let { propertyId } = req.params;
        propertyId = mongoose.Types.ObjectId(propertyId);
        const userId = req.userId;
        const { address, contactNo, price, days, paymentMode, startDate, endDate } = req.body;

        const order = new Order({
            address: address,
            contactNo: contactNo,
            price: price,
            days: days,
            paymentMode: paymentMode,
            startDate: startDate,
            endDate: endDate,
            userId: userId,
            propertyId: propertyId
        });

        const date1 = new Date(startDate).setHours(24,0,0,0);
        const date2 = new Date(endDate).setHours(24,0,0,0);
        const createdOrder = await order.save();
        await Property.updateOne({ _id: propertyId }, {
            $addToSet: {
                "booking": [{
                    "startDate": new Date(date1),
                    "endDate": new Date(date2)
                }]
            }
        });
        return res.send({
            ...createdOrder._doc,
            _id: createdOrder._id.toString(),
            userId: createdOrder.userId.toString(),
            propertyId: createdOrder.propertyId.toString(),
            createdAt: createdOrder.createdAt.toISOString(),
            updatedAt: createdOrder.updatedAt.toISOString()
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}

exports.getOrders = async (req, res) => {
    if (!req.isAuth) {
        throw new Error('Not authenticated !')
    }

    try {
        const userId = req.userId;
        const orders = await Order.find({ userId: userId });
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
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}