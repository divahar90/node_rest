var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/tuvshvs";

router.get('/', function(req, res) {
    mongoClient.connect(url, function(err, db) {
    db.collection("device").find({}).toArray(function(err, result) {
        if (err) throw err;
        else {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    message: 'Retrieved all'
                });
        }
        db.close();
        });
    });
})

router.get('/:id', function(req, res) {
    console.log("In get one");
    mongoClient.connect(url, function(err, db) {
        db.collection("device").findOne({"_id": new ObjectId(req.params.id)}, function(err, result) {
            if (err) throw err;
            else {
                res.status(200)
                    .json({
                        status: 'success',
                        data: result,
                        message: 'Retrieved one'
                    });
                db.close();
            }
        });
    });
})

router.post('/', function(req, res) {
    mongoClient.connect(url, function(err, db) {
    console.log(req.body);
    db.collection("device").insertOne(req.body, function(err, result) {
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
        var obj = {"deviceId": req.params.id}
        db.collection("device").deleteOne({"_id": new ObjectId(req.params.id)}, function(err, result) {
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
