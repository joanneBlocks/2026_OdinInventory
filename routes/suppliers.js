const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/suppliersController');

router.get('/',            ctrl.listSuppliers);
router.get('/new',         ctrl.newSupplierForm);
router.get('/:id',         ctrl.getSupplier);
router.get('/:id/edit',    ctrl.editSupplierForm);
router.post('/',           ctrl.createSupplier);
router.post('/:id/update', ctrl.updateSupplier);
router.post('/:id/delete', ctrl.deleteSupplier);

module.exports = router;