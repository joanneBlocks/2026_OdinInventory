const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/suppliersController');
const requireAdmin = require('../middleware/adminAuth');

router.get('/',            ctrl.listSuppliers);
router.get('/new',         ctrl.newSupplierForm);
router.get('/:id',         ctrl.getSupplier);
router.get('/:id/edit',    ctrl.editSupplierForm);
router.post('/',           requireAdmin, ctrl.createSupplier);
router.post('/:id/update', requireAdmin, ctrl.updateSupplier);
router.post('/:id/delete', requireAdmin, ctrl.deleteSupplier);

module.exports = router;