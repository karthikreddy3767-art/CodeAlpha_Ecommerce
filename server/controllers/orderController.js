const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.placeOrder = async (req, res) => {

    try {

        const { userId } = req.body;

        const cartItems = await Cart.find({
            userId
        }).populate("productId");

        if (cartItems.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        let total = 0;

        const items = cartItems.map(item => {

            total += item.productId.price * item.quantity;

            return {

                productId: item.productId._id,
                quantity: item.quantity

            };

        });

        const order = await Order.create({

            userId,
            items,
            totalAmount: total

        });

        await Cart.deleteMany({
            userId
        });

        res.status(201).json({

            message: "Order Placed Successfully",
            order

        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.getOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            userId: req.params.userId
        }).populate("items.productId");

        res.json(orders);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};