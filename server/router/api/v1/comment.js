const express = require("express");
const router = express.Router();
const comment_controller = require("../../../controller/api/v1/comment");

router.post("/create", comment_controller.create);

module.exports = router;
