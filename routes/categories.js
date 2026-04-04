const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/categoriesController');
const requireAdmin = require('../middleware/adminAuth');

router.get('/',            ctrl.listCategories);
router.get('/new',         ctrl.newCategoryForm);
router.get('/:id',         ctrl.getCategory);
router.get('/:id/edit',    ctrl.editCategoryForm);
router.post('/',           requireAdmin, ctrl.createCategory);
router.post('/:id/update', requireAdmin, ctrl.updateCategory);
router.post('/:id/delete', requireAdmin, ctrl.deleteCategory);

module.exports = router;