const express = require('express');
const rescue = require('express-rescue');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', rescue(middlewares.doLogin));

module.exports = router;
