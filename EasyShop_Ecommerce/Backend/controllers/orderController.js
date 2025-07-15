import Order from "../models/Order.js";

// Place Order
export const placeOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ msg: "Order placed", order: newOrder });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get User Orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({
      date: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
