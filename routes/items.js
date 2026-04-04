const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/itemsController');
const requireAdmin = require('../middleware/adminAuth');

router.get('/',            ctrl.listItems);
router.get('/new',         ctrl.newItemForm);
router.get('/:id',         ctrl.getItem);
router.get('/:id/edit',    ctrl.editItemForm);
router.post('/',           requireAdmin, ctrl.createItem);
router.post('/:id/update', requireAdmin, ctrl.updateItem);
router.post('/:id/delete', requireAdmin, ctrl.deleteItem);

module.exports = router;