import Order from "../models/Order.js";

export async function getOrder(req, res) {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        data: null,
      });
    }

    res.status(200).json({
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function checkout(req, res) {
  try {
    const { cartItems, totalPrice, userId } = req.body;

    if (req.userId !== userId)
      return res.status(401).json({ data: null, message: "Unauthorized" });

    const newOrder = await Order.create({
      user: req.userId,
      courses: cartItems,
      totalPrice,
    });

    res.status(200).json({
      message: "Checkout successfully",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
