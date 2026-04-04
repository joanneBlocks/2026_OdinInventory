const db = require('../db/queries');

exports.listItems = async (req, res) => {
  try {
    const items = await db.getAllItems();
    res.render('items/index', { items });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await db.getItemById(req.params.id);
    if (!item) return res.status(404).send('Item not found');
    res.render('items/show', { item });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.newItemForm = async (req, res) => {
  try {
    const [categories, suppliers] = await Promise.all([
      db.getAllCategories(),
      db.getAllSuppliers(),
    ]);
    res.render('items/form', { item: null, categories, suppliers });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.createItem = async (req, res) => {
  try {
    const { name, description, price, quantity,
            category_id, supplier_id } = req.body;
    await db.createItem({ name, description, price,
                          quantity, category_id, supplier_id });
    res.redirect('/items');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.editItemForm = async (req, res) => {
  try {
    const [item, categories, suppliers] = await Promise.all([
      db.getItemById(req.params.id),
      db.getAllCategories(),
      db.getAllSuppliers(),
    ]);
    if (!item) return res.status(404).send('Item not found');
    res.render('items/form', { item, categories, suppliers });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { name, description, price, quantity,
            category_id, supplier_id } = req.body;
    await db.updateItem(req.params.id, { name, description, price,
                                         quantity, category_id, supplier_id });
    res.redirect(`/items/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await db.deleteItem(req.params.id);
    res.redirect('/items');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};