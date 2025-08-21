const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getAgents,
  addAgent,
  deleteAgent,
} = require("../controllers/agents.controller");

router.get("/", auth, getAgents);
router.post("/", auth, addAgent);
router.delete("/", auth, deleteAgent);
module.exports = router;
