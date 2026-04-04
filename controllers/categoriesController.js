const db = require('../db/queries');

exports.listCategories = async (req, res) => {
  try {
    const categories = await db.getAllCategories();
    res.render('categories/index', { categories });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await db.getCategoryById(req.params.id);
    if (!category) return res.status(404).send('Category not found');
    res.render('categories/show', { category, error: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.newCategoryForm = (req, res) => {
  res.render('categories/form', { category: null });
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    await db.createCategory({ name, description });
    res.redirect('/categories');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.editCategoryForm = async (req, res) => {
  try {
    const category = await db.getCategoryById(req.params.id);
    if (!category) return res.status(404).send('Category not found');
    res.render('categories/form', { category });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    await db.updateCategory(req.params.id, { name, description });
    res.redirect(`/categories/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const count = await db.countItemsByCategory(id);
    if (count > 0) {
      const category = await db.getCategoryById(id);
      return res.render('categories/show', {
        category,
        error: `Cannot delete: ${count} item(s) still in this category.`
      });
    }
    await db.deleteCategory(id);
    res.redirect('/categories');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};