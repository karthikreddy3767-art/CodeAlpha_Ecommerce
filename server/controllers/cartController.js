const Cart = require("../models/Cart");

// Add Item
exports.addToCart = async (req, res) => {
    try {

        const { userId, productId } = req.body;

        let item = await Cart.findOne({
            userId,
            productId
        });

        if (item) {

            item.quantity += 1;
            await item.save();

            return res.json(item);

        }

        item = await Cart.create({
            userId,
            productId,
            quantity: 1
        });

        res.status(201).json(item);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

// Get Cart
exports.getCart = async (req, res) => {

    try {

        const cart = await Cart.find({
            userId: req.params.userId
        }).populate("productId");

        res.json(cart);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Increase Quantity
exports.increaseQuantity = async (req, res) => {

    const item = await Cart.findById(req.params.id);

    item.quantity++;

    await item.save();

    res.json(item);

};

// Decrease Quantity
exports.decreaseQuantity = async (req, res) => {

    const item = await Cart.findById(req.params.id);

    if (item.quantity > 1) {

        item.quantity--;

        await item.save();

    }

    res.json(item);

};

// Remove Item
exports.removeItem = async (req, res) => {

    await Cart.findByIdAndDelete(req.params.id);

    res.json({
        message: "Item Removed"
    });

};