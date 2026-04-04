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