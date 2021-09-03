const multer = require("multer");
const path = require("path");

//first set storage=> file name and destination
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, "review" + "-" + Date.now() + path.extname(file.originalname));
  },
});

const filerFilter = (req, file, cd) => {
  cd(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter: filerFilter,
});

module.exports = upload.single("categoryImage");
