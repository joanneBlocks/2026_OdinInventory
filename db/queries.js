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

// Items
exports.getAllItems = async () => {
  const { rows } = await pool.query(`
    SELECT i.*, 
           c.name AS category_name,
           s.name AS supplier_name
    FROM items i
    LEFT JOIN categories c ON i.category_id = c.id
    LEFT JOIN suppliers s  ON i.supplier_id = s.id
    ORDER BY i.created_at DESC
  `);
  return rows;
};

exports.getItemById = async (id) => {
  const { rows } = await pool.query(`
    SELECT i.*, 
           c.name AS category_name,
           s.name AS supplier_name
    FROM items i
    LEFT JOIN categories c ON i.category_id = c.id
    LEFT JOIN suppliers s  ON i.supplier_id = s.id
    WHERE i.id = $1
  `, [id]);
  return rows[0];
};