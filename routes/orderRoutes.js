import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// POST order
router.post("/orders", async (req, res) => {
  try {
    const { name, contact, items, total } = req.body;
    const status="pending";

    if (!name || !contact || !items || !total) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order({
      name,
      contact,
      items,
      total,
      status
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ GET all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.put("/orders/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Allowed transitions
    const statusFlow = {
      pending: "preparing",
      preparing: "done",
      done: "collected"
    };

    // Check if valid next step
    if (statusFlow[order.status] !== status) {
      return res.status(400).json({
        message: `Invalid status change from ${order.status} to ${status}`
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// routes/orders.js
// routes/orders.js
router.get("/orders", async (req, res) => {
  try {
    const { contact } = req.query;

    if (!contact) {
      return res.status(400).json({ message: "Contact is required" });
    }

    // Make sure we trim whitespace
    const trimmedContact = contact.trim();

    // Query by exact match
    const orders = await Order.find({ contact: trimmedContact });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No order found for this contact." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/orders/contact/:contact", async (req, res) => {
  try {
    const { contact } = req.params;

    if (!contact) {
      return res.status(400).json({ message: "Contact is required" });
    }

    const trimmedContact = contact.trim();

    // Find all orders matching this contact
    const orders = await Order.find({ contact: trimmedContact }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this contact" });
    }

    res.status(200).json(orders);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// routes/orders.js
router.get("/orders/search", async (req, res) => {
  try {
    const { name, contact } = req.query;

    // Check that both fields are provided
    if (!name || !contact) {
      return res.status(400).json({ message: "Name and contact are required" });
    }

    const trimmedName = name.trim();
    const trimmedContact = contact.trim();

    // Find orders that match BOTH name and contact exactly
    const orders = await Order.find({
      name: trimmedName,
      contact: trimmedContact
    }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this name and contact" });
    }

    res.status(200).json(orders);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;