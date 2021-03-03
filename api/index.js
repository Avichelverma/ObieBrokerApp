const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const db = require('./models');
const policyRoute = require('./routes/policyRoute');

const port = process.env.PORT || 4000;

app.use(bodyParser.json());

// routes with API
app.use('/api/search', policyRoute);

// Setup static content here such as post-build react client
// app.get('/', (req, res)=>{
// 	server client build here
// })

// Start the application
app.listen(port, () => {
	console.log(`Server running on ${port}`);
});

module.exports = app;
