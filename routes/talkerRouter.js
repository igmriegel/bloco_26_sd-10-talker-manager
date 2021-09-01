const express = require('express');
const rescue = require('express-rescue');
const middlewares = require('../middlewares');

const router = express.Router();

router.get('/', rescue(middlewares.getAllTalkers));
router.get('/:id', rescue(middlewares.getTalkerByID));

module.exports = router;
