const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const db = require('./models');
const policyRoute = require('./routes/policyRoute');

const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use('/api/search', policyRoute);

// app.get('/', (req, res) => {
// 	res.send('Hello world');
// });

app.listen(port, () => {
	console.log(`Server running on ${port}`);
});
