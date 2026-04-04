require('dotenv').config();
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const categoriesRouter = require('./routes/categories');
const itemsRouter      = require('./routes/items');
const suppliersRouter  = require('./routes/suppliers');

app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);
app.use('/suppliers', suppliersRouter);

app.get('/', (req, res) => res.redirect('/items'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));