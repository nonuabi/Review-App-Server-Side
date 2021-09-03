const fs = require("fs");
module.exports = (req, res, next) => {
  if (typeof req.file === "undefined" || typeof req.body === "undefined") {
    return res.status(400).json({
      error: "Problem with sending data",
    });
  }
  //get image and name
  console.log(req.file);
  let name = req.body.name;
  let image = req.file.path;
  let type = req.file.mimetype;

  //check type of image we will accept only png, jpg, jpeg
  if (
    !type.includes("jpeg") &&
    !type.includes("jpg") &&
    !type.includes("png")
  ) {
    //remove file
    fs.unlinkSync(image);
    return res.status(400).json({
      error: "file not support",
    });
  }
  //check file size
  if (req.file.size > 1024 * 1024 * 5) {
    fs.unlinkSync(image);
    return res.status(400).json({
      error: "file is too large",
    });
  }
  next();
};
