import {Collection, Db, MongoClient} from "mongodb";

var express = require('express');
var router = express.Router();

const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

interface IError {
	message: string;
}

interface IResponse {
	send(message: string);
}

let COLLECTION: Collection = null;

const init = (client_address: string, db_name: string, collection_name: string): void => {
	mongoClient.connect(client_address, (error: IError, client: MongoClient):void => {
		if (!error) {
			const db: Db = client.db(db_name);
			db.collection(collection_name, (error: IError, collection: Collection): void => {
				if (!error) {
					COLLECTION = collection;
				}
			});
		}
	});
};

init('mongodb://localhost', "myDB", "myCollection");

const result = (error: IError, value: string, response: IResponse): void => {
	if (!error) {
		response.send(value);
	} else {
		response.send(error.message);
	}
};

router.get('/insert', (request: object, response: IResponse, next: () => void): void => {
	const document: object = {name: "myRecord", content: "content"};
	COLLECTION.insertOne(document, (error: IError, value: object): void => {
		result(error, "OK!", response);
	});
});

router.get('/query', (request: object, response: IResponse, next: () => void): void => {
	const query: object = {name: "myRecord"};
	COLLECTION.find(query).toArray((error: IError, value: object): void => {
		result(error, JSON.stringify(value), response);
	});
});

router.get('/update', (request: object, response: IResponse, next: () => void): void => {
	const where: object = {name: "myRecord"};
	const set: object = {$set: {content: "update content!"}};
	COLLECTION.updateOne(where, set, (error: IError, value: object): void => {
		result(error, "OK!", response);
	});
});

router.get('/delete', (request: object, response: IResponse, next: () => void): void => {
	const where: object = {name: "myRecord"};
	COLLECTION.deleteOne(where, (error: IError, value: object): void => {
		result(error, "OK!", response);
	});
});

module.exports = router;
