const express = require('express');
const rescue = require('express-rescue');
const middlewares = require('../middlewares');

const router = express.Router();

router.get('/', rescue(middlewares.getAllTalkers));
router.post('/', rescue(middlewares.createTalker));
router.get('/:id', rescue(middlewares.getTalkerByID));
router.put('/:id', rescue(middlewares.editTalker));
router.delete('/:id', rescue(middlewares.deleteTalker));

module.exports = router;
