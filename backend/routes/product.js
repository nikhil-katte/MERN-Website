const express = require("express");
const router = express.Router();
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategories
} = require("../controllers/product");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
//all of params
router.param("userId", getUserById);
router.param("productsId", getProductById);

// all of actual routes
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);
//read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId",photo);
//delete routes
router.delete("/product/:productId/:userId", isAdmin, isAuthenticated, isSignedIn,deleteProduct)
//update
router.put("/product/:productId/:userId", isAdmin, isAuthenticated, isSignedIn,updateProduct)

// listing route
router.get ("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategories)

module.exports = router;
