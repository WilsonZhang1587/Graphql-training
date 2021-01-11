const { productDetailInfo } = require("./productDetailInfo");

module.exports.resolvers = {
  Query: {
    gg: async () => await productDetailInfo.find()
  }
};
