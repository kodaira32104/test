var express = require('express');
var router = express.Router();

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let COLLECTION = null;

function init(client_address, db_name, collection_name) {
	MongoClient.connect(client_address, (error, client) => {
		if (!error) {
			const db = client.db(db_name);
			db.collection(collection_name, (error, collection) => {
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
	} else {
		response.send(error.message);
	}
}

init('mongodb://localhost', "myDB", "myCollection");

router.get('/insert', (request, response, next) => {
	const document = {name: "myRecord", content: "content"};
	COLLECTION.insertOne(document, (error, value) => {
		result(error, "OK!", response);
	});
});

router.get('/query', (request, response, next) => {
	const query = {name: "myRecord"};
	COLLECTION.find(query).toArray((error, value) => {
		result(error, JSON.stringify(value), response);
	});
});

router.get('/update', (request, response, next) => {
	const where = {name: "myRecord"};
	const set = {$set: {content: "update content!"}};
	COLLECTION.updateOne(where, set, (error, value) => {
		result(error, "OK!", response);
	});
});

router.get('/delete', (request, response, next) => {
	const where = {name: "myRecord"};
	COLLECTION.deleteOne(where, (error, value) => {
		result(error, "OK!", response);
	});
});

module.exports = router;
