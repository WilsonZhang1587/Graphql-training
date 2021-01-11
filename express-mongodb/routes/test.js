const express = require("express");
const router = express.Router();

const tests = require("../models/test");

// Getting All
router.get("/", async (req, res) => {
  try {
    const test = await tests.find();
    res.json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Getting One
router.get("/:id", getTest, (req, res) => {
  res.send(res.test[0].data);
//   res.json(res.test);
});
// Creating One
router.post("/", async (req, res) => {
  const test = new tests({
    data: req.body.data
  });
  try {
    const newtest = await test.save();
    res.status(201).json(newtest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Updating One
router.patch("/:id", getTest, async (req, res) => {
  if (req.body.data != null) {
    res.test[0].data = req.body.data;
  }
  try {
    // const updateTest = await tests.updateOne(
    //   { ddd: req.params.id },
    //   { data: req.body.data }
    // );
    const updateTest = await res.test[0].save();
    res.json(updateTest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Deleting One
router.delete("/:id", getTest, async (req, res) => {
  try {
    // await tests.deleteOne({ ddd: req.params.id });
    await res.test[0].remove()

    res.json({ message: "Deleted test" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 將結果放置到 res裡面
async function getTest(req, res, next) {
  let test;
  try {
    test = await tests.find({ ddd: req.params.id }); // res=[]
    // test = await tests.findById(req.params.id); // res={}
    if (test == null) {
      return res.status(404).json({ message: "Cannot find test" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.test = test;
  next();
}

module.exports = router;
