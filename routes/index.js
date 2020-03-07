var express = require('express');
var router = express.Router();

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

router.get('/', function (req, res, next) {

	res.send("OK!");

});


router.get('/ connect', function (req, res, next) {
	MongoClient.connect('mongodb://localhost', (err, client) => {
		if (!err) {
			const db = client.db("myDB");
			db.collection("myCollection", (err2, collection) => {
				if (!err2) {
					res.send("OK!");
					client.close();
				} else {
					res.send(err2.message);
				}
			});
		} else {
			res.send(err.message);
		}
	});
});

router.get('/insert', function (req, res, next) {
	MongoClient.connect('mongodb://localhost', (err, client) => {
		if (!err) {
			const db = client.db("myDB");
			db.collection("myCollection", (err2, collection) => {
				if (!err2) {
					const document = {name: "myRecord", content: "content"};
					collection.insertOne(document, (err3, result) => {
						if (!err3) {
							res.send("OK!");
							client.close();
						} else {
							res.send(err3.message);
						}
					});
				} else {
					res.send(err2.message);
				}
			});
		} else {
			res.send(err.message);
		}
	});
});

router.get('/query', function (req, res, next) {
	MongoClient.connect('mongodb://localhost', (err, client) => {
		if (!err) {
			const db = client.db("myDB");
			db.collection("myCollection", (err2, collection) => {
				if (!err2) {
					const query = {name: "myRecord"};
					collection.find(query).toArray((err3, result) => {
						if (!err3) {
							res.send(JSON.stringify(result));
							client.close();
						} else {
							res.send(err3.message);
						}
					});
				} else {
					res.send(err2.message);
				}
			});
		} else {
			res.send(err.message);
		}
	});
});

router.get('/update', function (req, res, next) {
	MongoClient.connect('mongodb://localhost', (err, client) => {
		if (!err) {
			const db = client.db("myDB");
			db.collection("myCollection", (err2, collection) => {
				if (!err2) {
					const where = {name: "myRecord"};
					var set = {$set: {content: "update content!"}};
					collection.updateOne(where, set, (err3, result) => {
						if (!err3) {
							res.send("OK!");
							client.close();
						} else {
							res.send(err3.message);
						}
					});
				} else {
					res.send(err2.message);
				}
			});
		} else {
			res.send(err.message);
		}
	});
});

router.get('/delete', function (req, res, next) {
	MongoClient.connect('mongodb://localhost', (err, client) => {
		if (!err) {
			const db = client.db("myDB");
			db.collection("myCollection", (err2, collection) => {
				if (!err2) {
					const where = {name: "myRecord"};
					collection.deleteOne(where, (err3, result) => {
						if (!err3) {
							res.send("OK!");
							client.close();
						} else {
							res.send(err3.message);
						}
					});
				} else {
					res.send(err2.message);
				}
			});
		} else {
			res.send(err.message);
		}
	});
});

module.exports = router;
