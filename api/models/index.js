const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/ObieTestDB';

mongoose
	.connect(url, {
		keepAlive: true,
		useFindAndModify: false,
		useNewUrlParser: true
	})
	.then(console.log('MongoDB successfully connected'));

module.exports.Policy = require('./policy');
