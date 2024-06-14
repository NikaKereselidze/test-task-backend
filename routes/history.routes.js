const router = require("express").Router();
const { getHistory } = require("../controllers/history.controller");
const checkAuthMiddleware = require("../middlewares/checkAuth.middleware");

// GET
router.get("/history", checkAuthMiddleware, getHistory);

module.exports = router;
