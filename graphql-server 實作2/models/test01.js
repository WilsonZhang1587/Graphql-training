const mongoose = require("mongoose");

let test01Model = new mongoose.Schema(
  {
    data: { ttt: String },
    ddd: String
  },
  { versionKey: false }
);

module.exports.test01 = mongoose.model("test01", test01Model);
