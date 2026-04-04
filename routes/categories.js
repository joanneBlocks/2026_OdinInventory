const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/categoriesController');

router.get('/', ctrl.listCategories);
router.get('/:id', ctrl.getCategory);

module.exports = router;