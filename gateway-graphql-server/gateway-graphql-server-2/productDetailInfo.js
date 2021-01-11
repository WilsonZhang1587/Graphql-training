const mongoose = require("mongoose");

let productDetailInfoModel = new mongoose.Schema(
  {
    ids: String
  },
  { collection: "test03" }
);

const productDetailInfo = mongoose.model("test03", productDetailInfoModel);

module.exports = {
  productDetailInfo
};
