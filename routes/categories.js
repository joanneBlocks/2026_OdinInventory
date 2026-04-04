const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/categoriesController');

router.get('/',            ctrl.listCategories);
router.get('/new',         ctrl.newCategoryForm);
router.get('/:id',         ctrl.getCategory);
router.get('/:id/edit',    ctrl.editCategoryForm);
router.post('/',           ctrl.createCategory);
router.post('/:id/update', ctrl.updateCategory);
router.post('/:id/delete', ctrl.deleteCategory);

module.exports = router;