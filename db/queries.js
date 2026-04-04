const pool = require('./pool');

// Categories
exports.getAllCategories = async () => {
  const { rows } = await pool.query(
    'SELECT * FROM categories ORDER BY name'
  );
  return rows;
};

exports.getCategoryById = async (id) => {
  const { rows } = await pool.query(
    'SELECT * FROM categories WHERE id = $1', [id]
  );
  return rows[0];
};

// Suppliers
exports.getAllSuppliers = async () => {
  const { rows } = await pool.query(
    'SELECT * FROM suppliers ORDER BY name'
  );
  return rows;
};

exports.getSupplierById = async (id) => {
  const { rows } = await pool.query(
    'SELECT * FROM suppliers WHERE id = $1', [id]
  );
  return rows[0];
};