const router = require("express").Router();
const { signIn, signUp, getMe } = require("../controllers/auth.controller");
const Validator = require("../middlewares/Validator.middleware");
const checkAuthMiddleware = require("../middlewares/checkAuth.middleware");
const { authValidator } = require("../validations/auth.validator");

// GET
router.get("/me", checkAuthMiddleware, getMe);

// POST
router.post("/signIn", Validator(authValidator), signIn);
router.post("/signUp", Validator(authValidator), signUp);

module.exports = router;
