const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/itemsController');

router.get('/', ctrl.listItems);
router.get('/:id', ctrl.getItem);

module.exports = router;