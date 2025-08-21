const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { register, login, verify } = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/verify", auth, verify);
module.exports = router;
