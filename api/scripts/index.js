const MongoClient = require('mongodb').MongoClient;

const { sheetPL, sheetFlood, sheetCL } = require('./script');

const url = 'mongodb://localhost:27017';

const dbName = 'ObieTestDB';

MongoClient.connect(url, function(err, client) {
	console.log('Connected Successfully to server');

	const db = client.db(dbName);

	main().then((value) => {
		insertDocuments(db, value, function() {
			client.close();
		});
	});
});

const insertDocuments = function(db, value, callback) {
	// Get the documents collection
	const collection = db.collection('policies');
	// Insert some documents
	// console.log(value);
	collection.insertMany(value, function(err, result) {
		console.log('Inserted ' + value.length + ' documents into the collection');
		callback(result);
	});
};

function combineDict(obj1, obj2) {
	let result = [];
	for (let i = 0; i < obj1.length; i++) {
		let dataDict1 = obj1[i];
		let dataDict2 = obj2[i];

		let combinedStateCarrierDict = Object.assign({}, dataDict1.state_carrier, dataDict2.state_carrier);
		result.push({ name: dataDict1.name, state_carrier: combinedStateCarrierDict });
	}
	return result;
}

async function main() {
	let result = [];
	let sheetData1 = await sheetPL(1);

	let sheetData2 = await sheetPL(2);

	result = combineDict(sheetData1, sheetData2);

	let sheetData3 = await sheetFlood(3);

	result = combineDict(result, sheetData3);

	let sheetData4 = await sheetPL(4);

	result = combineDict(result, sheetData4);

	let sheetData5 = await sheetCL(5);

	result.push(sheetData5);
	return result;
}
