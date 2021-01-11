const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} = require("graphql");

const { test01 } = require("./models/test01");

// Mongodb
const MongodbType = new GraphQLObjectType({
  name: "Mongodb",
  fields: () => ({
    id: { type: GraphQLID },
    data: { type: tttType },
    ddd: { type: GraphQLString }
  })
});
const tttType = new GraphQLObjectType({
  name: "ttt",
  fields: () => ({
    ttt: { type: GraphQLString }
  })
});

// input -> 返回值跟輸入值的架構設定是不同的
const tttInType = new GraphQLInputObjectType({
  name: "tttIn",
  fields: {
    ttt: { type: GraphQLString }
  }
});

// Query
module.exports.mongodbQuery = {
  mongodb: {
    type: new GraphQLList(MongodbType),
    resolve(parent, args) {
      return test01.find();
    }
  }
};

// Mutation
module.exports.mongodbMutation = {
  mongodbRootMutationPost: {
    type: new GraphQLList(MongodbType), // 定義返回值的資料型態
    args: {
      data: { type: tttInType }, // dataBase 為 Object 的時候，要使用 GraphQLInputObjectType
      ddd: { type: GraphQLString }
    },
    resolve: async (root, { data, ddd }) => {
      const test = new test01({ data, ddd });
      await test.save(); // mongoose API
      return test01.find();
    }
  },
  mongodbRootMutationUpdateOne: {
    type: new GraphQLList(MongodbType),
    args: {
      ddd: { type: GraphQLString },
      data: { type: tttInType }
    },
    resolve: async (root, { ddd, data }) => {
      await test01.updateOne({ ddd: ddd }, { data: data });
      return test01.find();
    }
  },
  mongodbRootMutationUpdateOne_2: {
    type: new GraphQLList(MongodbType),
    args: {
      ddd: { type: GraphQLString },
      data: { type: tttInType }
    },
    resolve: async (root, { ddd, data }) => {
      await test01.findOne({ ddd: ddd }, (err, doc) => {
        doc.data = data;
        doc.save();
      });
      return test01.find();
    }
  },
  // updateOne & updateMany 前者將僅更新匹配的第一個文檔，後者不限制
  mongodbRootMutationUpdateMany: {
    type: new GraphQLList(MongodbType),
    args: {
      ddd: { type: GraphQLString },
      data: { type: tttInType }
    },
    resolve: async (root, { ddd, data }) => {
      await test01.updateMany({ ddd: ddd }, { data: data }); // 順序有差
      return test01.find();
    }
  },
  mongodbRootMutationDelete: {
    type: new GraphQLList(MongodbType),
    args: {
      ddd: { type: GraphQLString }
    },
    resolve: async (root, { ddd }) => {
      await test01.deleteOne({ ddd: ddd }); // mongoose API
      return test01.find();
    }
  }
};
