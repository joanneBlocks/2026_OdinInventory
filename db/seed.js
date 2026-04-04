require('dotenv').config();
const pool = require('./pool');

async function seed() {
  console.log('Seeding database...');

  await pool.query('DELETE FROM items');
  await pool.query('DELETE FROM categories');
  await pool.query('DELETE FROM suppliers');

  await pool.query('ALTER SEQUENCE categories_id_seq RESTART WITH 1');
  await pool.query('ALTER SEQUENCE suppliers_id_seq RESTART WITH 1');
  await pool.query('ALTER SEQUENCE items_id_seq RESTART WITH 1');

  const cats = await pool.query(`
    INSERT INTO categories (name, description)
    VALUES
      ('Electronics', 'Gadgets and components'),
      ('Office Supplies', 'Stationery and furniture'),
      ('Cleaning', 'Hygiene and maintenance products')
    RETURNING id, name
  `);

  const sups = await pool.query(`
    INSERT INTO suppliers (name, email, phone)
    VALUES
      ('TechWorld Inc', 'orders@techworld.com', '555-0101'),
      ('OfficeMax', 'supply@officemax.com', '555-0102')
    RETURNING id, name
  `);

  const electronics = cats.rows[0];
  const office = cats.rows[1];
  const techworld = sups.rows[0];
  const officemax = sups.rows[1];

  await pool.query(
    `INSERT INTO items
       (name, description, price, quantity, category_id, supplier_id)
     VALUES
       ('Wireless Mouse', 'Ergonomic 2.4GHz mouse', 29.99, 45, $1, $2),
       ('USB-C Hub', '7-in-1 multiport adapter', 49.99, 12, $1, $2),
       ('Mechanical Keyboard', 'Tactile switches, TKL layout', 89.99, 8, $1, $2),
       ('Standing Desk', 'Height adjustable, 160x80cm', 399.00, 5, $3, $4),
       ('Ballpoint Pens x10', 'Blue ink, medium tip', 4.99, 100, $3, $4),
       ('Whiteboard', '120x90cm with markers', 59.99, 15, $3, $4)`,
    [electronics.id, techworld.id, office.id, officemax.id]
  );

  console.log('Done! Database seeded successfully.');
  await pool.end();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});