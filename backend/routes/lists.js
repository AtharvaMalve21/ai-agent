const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../config/multer");

const {
  addList,
  getLists,
  getSingleList,
} = require("../controllers/lists.controller");

router.post("/upload", auth, upload.single("csvFile"), addList);
router.get("/", auth, getLists);
router.get("/:id", auth, getSingleList);
module.exports = router;
