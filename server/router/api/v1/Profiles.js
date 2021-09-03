const express = require("express");
const router = express.Router();

const profile_controller = require("../../../controller/api/v1/profiles");
const auth = require("../../../middlewares/auth");
router.post("/timeline", auth, profile_controller.timeLine);
router.get("/profile", auth, profile_controller.personal);
module.exports = router;
