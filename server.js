const express = require('express');
const sequelize = require('./config/connection');

// Import the routers
const tagRoutes = require('./routes/api/tag-routes');
const categoryRoutes = require('./routes/api/category-routes');
const productRoutes = require('./routes/api/product-routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the routers
app.use('/api/tags', tagRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
