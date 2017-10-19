var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/tuvshvs";

router.get('/', function(req, res) {
    console.log("In get all loc");
    mongoClient.connect(url, function(err, db) {
        db.collection("location").find({}).toArray(function(err, result) {
            if (err) throw err;
            else {
                res.status(200)
                    .json({
                        status: 'success',
                        data: result,
                        message: 'Retrieved all'
                    });
                db.close();
            }
        });
    });
})

router.get('/:id', function(req, res) {
    mongoClient.connect(url, function(err, db) {
        db.collection("location").find({"postal_code": req.params.id}).toArray(function(err, result) {
            if (err) throw err;
            else {
                console.log(result)
                res.status(200)
                    .json({
                        status: 'success',
                        data: result,
                        message: 'Retrieved location'
                    });
                db.close();
            }
        });
    });
})

router.post('/', function(req, res) {
    console.log(req.body);
    mongoClient.connect(url, function(err, db) {
        db.collection("location").insertOne(req.body, function(err, result) {
            if (err) throw err;
            else {
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Inserted'
                    });
                db.close();
            }
        });
    });
})

router.put('/', function(req, res) {

})

router.delete('/:id', function(req, res) {
    mongoClient.connect(url, function(err, db) {
        console.log(req.params.id);
        db.collection("location").deleteOne({"_id": new ObjectId(req.params.id)}, function(err, result) {
            if (err) throw err;
            else {
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Deleted'
                    });
                db.close();
            }
        });
    });
})

module.exports.router = router;