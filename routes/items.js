const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/itemsController');

router.get('/',            ctrl.listItems);
router.get('/new',         ctrl.newItemForm);
router.get('/:id',         ctrl.getItem);
router.get('/:id/edit',    ctrl.editItemForm);
router.post('/',           ctrl.createItem);
router.post('/:id/update', ctrl.updateItem);
router.post('/:id/delete', ctrl.deleteItem);

module.exports = router;