const { productDetailInfo } = require("./productDetailInfo");

module.exports.resolvers = {
  Query: {
    me: async () => await productDetailInfo.find()
  }
};
