const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/suppliersController');

router.get('/', ctrl.listSuppliers);
router.get('/:id', ctrl.getSupplier);

module.exports = router;