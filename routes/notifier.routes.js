const router = require("express").Router();
const {
  listProducts,
  addProduct,
  deleteProduct,
} = require("../controllers/notifier.controller");
const Validator = require("../middlewares/Validator.middleware");
const checkAuthMiddleware = require("../middlewares/checkAuth.middleware");
const {
  listProductsValidator,
  addProductValidator,
  deleteProductValidator,
} = require("../validations/notifier.validator");

// GET
router.get("/list", Validator(listProductsValidator), listProducts);

// POST
router.post(
  "/add",
  checkAuthMiddleware,
  Validator(addProductValidator),
  addProduct
);

// DELETE
router.delete(
  "/delete",
  checkAuthMiddleware,
  Validator(deleteProductValidator),
  deleteProduct
);

module.exports = router;
