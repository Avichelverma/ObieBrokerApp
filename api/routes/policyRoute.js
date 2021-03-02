const express = require('express');
const router = express.Router({ mergeParams: true });

const { searchPolicy } = require('../controllers/policyController');

router.route('/').get(searchPolicy);

module.exports = router;
