const Comment = require("../../../models/comment");
const Post = require("../../../models/posts");

module.exports.create = async function (req, res) {
  console.log(req.body);
  try {
    let post = await Post.findById(req.body.post_id);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post_id,
        user: req.body.user_id,
      });
      await post.comments.push(comment);
      await post.save();
    } else {
      return res.status(400).json({
        message: "post not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "error in create post in schema",
      error: err,
    });
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      let post_id = comment.post;
      comment.remove();
      let post = await Post.findByIdAndUpdate(post_id, {
        $pull: { comments: req.params.id },
      });
      req.flash("success", "comment is deleted!");
      return res.redirect("back");
    } else {
      req.flash("error", "You can not delete comment!");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", "You can not delete comment!");
    return res.redirect("/");
  }
};
