const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const recipesRoutes = require('./routes/recipes');
const categoriesRoutes = require('./routes/categories');
const ratingsRoutes = require('./routes/ratings');
const ingredientsRoutes = require('./routes/ingredients');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/recipes', recipesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/ratings', ratingsRoutes);
app.use('/api/ingredients', ingredientsRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});