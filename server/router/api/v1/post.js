const express = require("express");
const router = express.Router();

const auth = require("../../../middlewares/auth");
const uploadMulter = require("../../../middlewares/upload");
const validation = require("../../../middlewares/validation");

const postController = require("../../../controller/api/v1/post");

router.post("/create", uploadMulter, validation, auth, postController.create);
router.get("/viewPosts", postController.getCollection);
router.post("/like", auth, postController.like);
router.post("/dislike", auth, postController.dislike);
router.post("/delete", auth, postController.delete);
router.post(
  "/category",
  uploadMulter,
  validation,
  postController.createCategory
);

module.exports = router;
