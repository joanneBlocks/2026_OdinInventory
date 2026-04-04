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

// Create, update, delete categories
exports.createCategory = async ({ name, description }) => {
  await pool.query(
    'INSERT INTO categories (name, description) VALUES ($1, $2)',
    [name, description]
  );
};

exports.updateCategory = async (id, { name, description }) => {
  await pool.query(
    'UPDATE categories SET name=$1, description=$2 WHERE id=$3',
    [name, description, id]
  );
};

exports.deleteCategory = async (id) => {
  await pool.query('DELETE FROM categories WHERE id=$1', [id]);
};

exports.countItemsByCategory = async (id) => {
  const { rows } = await pool.query(
    'SELECT COUNT(*) FROM items WHERE category_id=$1', [id]
  );
  return parseInt(rows[0].count, 10);
};

// Create, update, delete suppliers
exports.createSupplier = async ({ name, email, phone }) => {
  await pool.query(
    'INSERT INTO suppliers (name, email, phone) VALUES ($1, $2, $3)',
    [name, email, phone]
  );
};

exports.updateSupplier = async (id, { name, email, phone }) => {
  await pool.query(
    'UPDATE suppliers SET name=$1, email=$2, phone=$3 WHERE id=$4',
    [name, email, phone, id]
  );
};

exports.deleteSupplier = async (id) => {
  await pool.query('DELETE FROM suppliers WHERE id=$1', [id]);
};

// Create, update, delete items
exports.createItem = async ({ name, description, price, quantity, category_id, supplier_id }) => {
  await pool.query(
    `INSERT INTO items (name, description, price, quantity, category_id, supplier_id)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [name, description, price, quantity, category_id || null, supplier_id || null]
  );
};

exports.updateItem = async (id, { name, description, price, quantity, category_id, supplier_id }) => {
  await pool.query(
    `UPDATE items SET name=$1, description=$2, price=$3,
     quantity=$4, category_id=$5, supplier_id=$6 WHERE id=$7`,
    [name, description, price, quantity, category_id || null, supplier_id || null, id]
  );
};

exports.deleteItem = async (id) => {
  await pool.query('DELETE FROM items WHERE id=$1', [id]);
};