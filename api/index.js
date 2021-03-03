const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const db = require('./models');
const policyRoute = require('./routes/policyRoute');

const port = process.env.PORT || 4000;

app.use(bodyParser.json());

// pass routes
app.use('/api/search', policyRoute);

// app.get('/', (req, res) => {
// 	res.send('Hello world');
// });

// Setup static content here such as post-build react client

// Start the application
app.listen(port, () => {
	console.log(`Server running on ${port}`);
});

module.exports = app;
