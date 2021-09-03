const express = require("express");
const router = express.Router();

const auth = require("../../../middlewares/auth");
const uploadMulter = require("../../../middlewares/upload");
const validation = require("../../../middlewares/validation");
const userApi = require("../../../controller/api/v1/users");
router.post("/signup", uploadMulter, validation, userApi.sigup);
router.post("/login", userApi.login);
router.get("/logout", userApi.logout);
router.post("/update", auth, userApi.update);
router.get("/getUser", auth, userApi.getUser);
module.exports = router;
