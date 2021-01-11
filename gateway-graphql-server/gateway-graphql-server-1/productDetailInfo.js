const mongoose = require("mongoose");

let productDetailInfoModel = new mongoose.Schema(
  {
    ddd: String
  },
  { collection: "test01" }
);

const productDetailInfo = mongoose.model("test01", productDetailInfoModel);

module.exports = {
  productDetailInfo
};
