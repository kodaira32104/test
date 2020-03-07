"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var COLLECTION = null;
function init(client_address, db_name, collection_name) {
    mongoClient.connect(client_address, function (error, client) {
        if (!error) {
            var db = client.db(db_name);
            db.collection(collection_name, function (error, collection) {
                if (!error) {
                    COLLECTION = collection;
                }
            });
        }
    });
}
function result(error, value, response) {
    if (!error) {
        response.send(value);
    }
    else {
        response.send(error.message);
    }
}
init('mongodb://localhost', "myDB", "myCollection");
router.get('/insert', function (request, response, next) {
    var document = { name: "myRecord", content: "content" };
    COLLECTION.insertOne(document, function (error, value) {
        result(error, "OK!", response);
    });
});
router.get('/query', function (request, response, next) {
    var query = { name: "myRecord" };
    COLLECTION.find(query).toArray(function (error, value) {
        result(error, JSON.stringify(value), response);
    });
});
router.get('/update', function (request, response, next) {
    var where = { name: "myRecord" };
    var set = { $set: { content: "update content!" } };
    COLLECTION.updateOne(where, set, function (error, value) {
        result(error, "OK!", response);
    });
});
router.get('/delete', function (request, response, next) {
    var where = { name: "myRecord" };
    COLLECTION.deleteOne(where, function (error, value) {
        result(error, "OK!", response);
    });
});
module.exports = router;
