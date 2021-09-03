const Post = require("../../../models/posts");
const User = require("../../../models/users");
module.exports.create = async function (req, res) {
  console.log("create -->> ", req);
  try {
    let post = await Post.create({
      Description: req.body.description,
      user: req.userID,
      image: req.file.path,
      address: req.body.address,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      likes: 0,
      dislikes: 0,
    })
      .then((post) => {
        if (!post) {
          return res.status(500).json({
            message: "post is not create in db",
          });
        }
        console.log("post details ", post);
        return res.status(200).json({
          message: "post is created",
          post,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: err,
        });
      });
  } catch (err) {
    return res.status(500).json({
      message: "error in create post in schema",
    });
  }
};

module.exports.getCollection = async function (req, res) {
  let posts = await Post.find({}).sort("-createdAt").populate("user");
  return res.status(200).json({
    postData: posts,
  });
};


//update like count in db
module.exports.like = async function (req, res) {
  try {
    let post = await Post.findById(req.body.id);

    const totalLikes = (await parseInt(req.body.likes)) + 1;
    await post.updateOne({
      $set: { likes: totalLikes },
    });

    return res.status(201).json({
      message: "successfully fetch the post ",
      postDetails: post,
    });
  } catch (err) {
    return res.status(500).json({
      message: "error Occure!! while liking the post",
      error: err,
    });
  }
};

//dislike api
module.exports.dislike = async function (req, res) {
  try {
    console.log("dislike ---> ", req);
    let post = await Post.findById(req.body.id);
    const totalDislikes = (await parseInt(req.body.dislikes)) - 1;
    await post.updateOne({
      $set: { dislikes: totalDislikes },
    });

    return res.status(201).json({
      message: "successfully fetch the post ",
      postDetails: post,
    });
  } catch (err) {
    return res.status(500).json({
      message: "error Occure!! while disliking the post",
      error: err,
    });
  }
};

//delete post api
module.exports.delete = async function (req, res) {
  console.log("delete req ", req);
  try {
    let post = await Post.findById(req.body.id);
    await post.remove();
    return res.status(200).json({
      message: "post deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "error while deleting the post ",
      err,
    });
  }
};

module.exports.createCategory = function (req, res) {
  res.json({
    message: "success",
  });
};
