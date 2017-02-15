var express = require('express');
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var router = express.Router();

// Connection URL
var url = 'mongodb://localhost:27017/readings';

/* GET readings listing. */
router.get('/', function(req, res, next) {
    queryCollection('bloodpressure', function (docs) {
        res.send(docs);
    });
});

router.put('/', function (req, res, next) {
    res.send("putting new doc to database");
});

queryCollection = function(collectionName, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        console.log(collectionName);
        db.collection(collectionName).find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log(docs);
            callback(docs);
        });

        db.close();
    });
}

module.exports = router;