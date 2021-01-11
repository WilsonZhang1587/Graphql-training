import mongoose from "mongoose";

export const test01 = mongoose.model("test01", { data: { ttt: String } });
