const express = require("express");
const router = express.Router();
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaceList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
} = require("../controllers/order");

//param
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//actual routes
//create
router.post(
  "/order/create/:userId",
  isAuthenticated,
  isSignedIn,
  pushOrderInPurchaceList,
  updateStock,
  createOrder
);

//read
router.get(
  "/order/all/:userId",
  isAuthenticated,
  isSignedIn,
  isAdmin,
  getAllOrders
);

router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
