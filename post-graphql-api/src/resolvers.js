import { test01 } from "./models/test01";

export const resolvers = {
  Query: {
    hello: () => "hi",
    datas: () => test01.find()
  },
  Mutation: {
    createTest: async (_, { data }) => {
      const test = new test01({ data });
      await test.save();
      return test;
    }
  }
};
