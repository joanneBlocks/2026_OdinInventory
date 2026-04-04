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
    res.render('categories/show', { category });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};