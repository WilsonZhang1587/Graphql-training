var express = require("express");
var router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "test";

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/get-data/:collectionName/:tableId", function(req, res, next) {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    var db = client.db(dbName);
    db.collection(req.params.collectionName)
      .find({})
      .toArray(function(err, docs) {
        // Print the documents returned
        const choiceData = docs.find(
          doc => doc._id == req.params.tableId
        );
        res.send(choiceData);
        // Close the DB
        client.close();
      });
  });
});


module.exports = router;
