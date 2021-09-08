const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://abhishek:<abhishektest>@cluster0.gkjbi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting to db"));

db.once("open", function () {
  console.log("we'r connected to :: MONGODB");
});

module.exports = db;
