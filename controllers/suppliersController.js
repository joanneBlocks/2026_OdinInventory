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
    res.render('suppliers/show', { supplier, error: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.newSupplierForm = (req, res) => {
  res.render('suppliers/form', { supplier: null });
};

exports.createSupplier = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    await db.createSupplier({ name, email, phone });
    res.redirect('/suppliers');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.editSupplierForm = async (req, res) => {
  try {
    const supplier = await db.getSupplierById(req.params.id);
    if (!supplier) return res.status(404).send('Supplier not found');
    res.render('suppliers/form', { supplier });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    await db.updateSupplier(req.params.id, { name, email, phone });
    res.redirect(`/suppliers/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    await db.deleteSupplier(req.params.id);
    res.redirect('/suppliers');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};