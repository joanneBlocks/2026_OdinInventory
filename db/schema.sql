CREATE TABLE categories (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE suppliers (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20)
);

CREATE TABLE items (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(150) NOT NULL,
  description TEXT,
  price       NUMERIC(10,2) NOT NULL CHECK (price > 0),
  quantity    INTEGER DEFAULT 0 CHECK (quantity >= 0),
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  supplier_id INTEGER REFERENCES suppliers(id) ON DELETE SET NULL,
  created_at  TIMESTAMP DEFAULT NOW()
);