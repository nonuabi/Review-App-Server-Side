require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/mongoose");
const port = process.env.PORT || 3001;

const app = express();

app.use("/uploads", express.static("uploads"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", require("./router/index"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Server Error  ${err}`);
    return;
  }
  console.log(`Server running on port no ${port}`);
});
