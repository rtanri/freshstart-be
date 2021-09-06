const express = require("express");
const mongoose = require("mongoose");
const Address = require("../models/address");
const router = express.Router();
const Orders = require("../models/orders");
const checkAuth = require("../middleware/check-auth");

// creating an address
router.post("/api/v1/addAddress", checkAuth, async (req, res) => {
  try {
    const address = new Address({
      addressType: req.body.addressType,
      postalCode: req.body.postalCode,
      city: req.body.city,
      country: req.body.country,
      itemLimit: req.body.itemLimit,
      deliveryType: req.body.deliveryType,
    });
    const newAddress = await address.save();
    console.log(newAddress);
    res.status(201).json({
      message: "Added address successfully",
      message: req.body._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// finding an address
router.get("/api/v1/addAddress/:addressId", checkAuth, async (req, res) => {
  try {
    const id = req.params.addressId;
    const newAddress = await Address.findById(id);
    res.json(newAddress);
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// edit address
router.patch("/api/v1/addAddress/:addressId", async (req, res) => {
  try {
    const id = req.params.productId;
    console.log(req.body);
    const updateOps = {};
    for (const ops in req.body) {
      updateOps[ops] = req.body[ops];
    }
    console.log(updateOps);
    const newAddress = await Address.updateOne(
      { _id: id },
      { $set: updateOps }
    );
    res.status(200).json(newAddress);
    res.redirect("/api/v1/addAddress/");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one existing order
router.get("/api/v1/orders", checkAuth, async (req, res) => {
  try {
    const newOrder = await Orders.find()
      .populate("address")
      .populate("products");
    res.status(200).json(newOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get all existing orders based on user
router.get("/api/v1/allOrders/", checkAuth, async (req, res) => {
  try {
    const id = req.userData.userId;
    const allOrders = await Orders.find({ userId: id })
      .sort({ createdAt: -1 })
      .limit(3);
    res.json(allOrders);
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});
//create new order
router.post("/api/v1/orders", checkAuth, async (req, res) => {
  try {
    const address = new Address({}); /* Revin add this row */
    const newAddress = await address.save(); /* Revin add this row */
    const orders = new Orders({
      products: req.body.product_id,
      userId: req.userData.userId,
      address: newAddress /* Revin add this row */,
    });
    const newOrders = await orders.save();
    console.log(newOrders);
    res
      .status(201)
      .json({
        orderID: newOrders._id /* Revin add this row */,
        addressID: newOrders.address._id /* Revin add this row */,
        userID: newOrders.userId /* Revin add this row */,
        message: "created order successfully",
      })
      .populate("user")
      .populate("address");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// find orders
router.get("/api/v1/orders/:orderId", async (req, res) => {
  try {
    const id = req.params.orderId;
    const newOrders = await Orders.findById(id);
    res.json(newOrders);
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.delete("/api/v1/orders/:orderId", async (req, res) => {
  try {
    const id = req.params.orderId;
    const deleteOrder = await Orders.remove({ _id: id });
    res.status(200).json(deleteOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// edit order paid status
router.patch("/api/v1/payment/:orderID", async (req, res) => {
  try {
    const id = req.params.orderID;
    console.log(req.body);

    const selectedOrder = await Orders.updateOne(
      { _id: id },
      { $set: { isPaid: true } }
    );
    res.status(200).json(selectedOrder);
    // res.redirect("/api/v1/addAddress/");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
