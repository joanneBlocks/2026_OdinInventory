const db = require('../db/queries');

exports.listSuppliers = async (req, res) => {
  try {
    const suppliers = await db.getAllSuppliers();
    res.render('suppliers/index', { suppliers });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getSupplier = async (req, res) => {
  try {
    const supplier = await db.getSupplierById(req.params.id);
    if (!supplier) return res.status(404).send('Supplier not found');
    res.render('suppliers/show', { supplier });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};