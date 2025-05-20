 Cooking Recipes Database Project

A MySQL-based database system designed to manage users, recipes, ingredients, categories, and ratings efficiently. This project includes:
- A backend API built with Node.js.
- A React-based frontend for user interaction.
- A structured database schema for efficient data management.



 Features

- User Management: Store user profiles and preferences securely.
- Recipe Management: Organize recipes with detailed instructions and ingredients.
- Ingredient Tracking: Maintain a database of ingredients with quantities and units.
- Categorization: Group recipes into categories for easy navigation.
- Ratings and Reviews: Allow users to rate and review recipes.
- Favorites: Enable users to mark recipes as favorites for quick access.



 Project Structure

Cooking_Recipes_Database_Project/
├── sql/                              # SQL scripts for database schema, data, and queries
│   ├── 01_create_schema.sql          # Defines the database schema, tables, and relationships
│   ├── 02_insert_sample_data.sql     # Populates the database with sample data
│   ├── 03_queries.sql                # Example SQL queries for common operations
│   ├── migrations/                   # (Optional) Database migration scripts for version control
├── docs/                             # Documentation and diagrams
│   ├── ER_diagram.png                # Entity-Relationship diagram of the database
│   ├── project_report.md             # Detailed project report
│   ├── README.md                     # Documentation for the `docs` folder
├── exports/                          # Database exports for backup or sharing
│   ├── sample_export.sql             # Example database export
│   ├── README.md                     # Documentation for the `exports` folder
├── src/                              # Application source code
│   ├── backend/                      # Backend logic (e.g., Node.js, Express)
│   │   ├── app.js                    # Main backend application file
│   │   ├── routes/                   # API route handlers
│   │   │   ├── recipes.js            # Routes for recipe-related operations
│   │   │   ├── users.js              # Routes for user-related operations
│   │   ├── middleware/               # Middleware for authentication and access control
│   │   │   ├── auth.js               # Authentication middleware
│   │   ├── db/                       # Database connection and queries
│   │   │   ├── connection.js         # Database connection setup
│   │   │   ├── queries.js            # Common database queries
│   ├── frontend/                     # Frontend code (e.g., React)
│       ├── public/                   # Static assets
│       ├── src/                      # React components and logic
│           ├── components/           # Reusable React components
│           ├── pages/                # Page components (e.g., Home, Recipes, Login)
│           ├── App.js                # Main React application file
│           ├── index.js              # React entry point
├── tests/                            # Test scripts for database and application
│   ├── test_queries.sql              # SQL scripts to test queries
│   ├── test_data.sql                 # SQL scripts to test sample data
│   ├── backend/                      # Backend test scripts
│   ├── frontend/                     # Frontend test scripts
├── LICENSE                           # License file (e.g., MIT License)
├── README.md                         # Main project documentation



 Getting Started

 Prerequisites

Ensure you have the following installed on your system:
- Database Server: MySQL Server (8.x recommended)
- Backend: Node.js (16.x or later) with npm
- Frontend: React (18.x or later)
- Database IDE: MySQL Workbench or any compatible SQL IDE



 Setup Instructions

 Database
1. Clone or download this repository:
   ```bash
   git clone https://github.com/Baffoe6/Cooking_Recipes_Database_Project.git
   cd Cooking_Recipes_Database_Project
   ```
2. Open your MySQL IDE and connect to your MySQL server.
3. Execute the following scripts in order:
   - `sql/01_create_schema.sql`: Creates the database schema.
   - `sql/02_insert_sample_data.sql`: Inserts sample data into the database.
4. Use `sql/03_queries.sql` to run example queries and test the database.

 Backend
1. Navigate to the `src/backend` directory:
   ```bash
   cd src/backend
   ```
2.Install dependencies:
      
      npm install

3. Start the backend server:
      node app.js

4. The backend will run on http://localhost:3000.

Frontend

1. Navigate to the src/frontend directory:
      cd src/frontend

2. Install dependencies:
      npm install

3. Start the React development server:
      npm start

4. The frontend will run on http://localhost:3000.

Example Queries

Here are some example SQL queries you can run to test the database:

Retrieve all recipes in a specific category:

```sql
SELECT r.recipe_id, r.recipe_name, c.category_name
FROM recipes r
JOIN categories c ON r.category_id = c.category_id
WHERE c.category_name = 'Breakfast';
```

Find the highest-rated recipes:

```sql
SELECT r.recipe_id, r.recipe_name, AVG(rt.rating) AS average_rating
FROM recipes r
JOIN ratings rt ON r.recipe_id = rt.recipe_id
GROUP BY r.recipe_id, r.recipe_name
ORDER BY average_rating DESC;
```

List ingredients required for a recipe:

```sql
SELECT r.recipe_name, i.ingredient_name, ri.quantity, ri.unit
FROM recipes r
JOIN recipe_ingredients ri ON r.recipe_id = ri.recipe_id
JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
WHERE r.recipe_name = 'Pancakes';
```

Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and submit a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Future Improvements

1. Role-Based Access Control:

Add roles (e.g., admin, user) for managing access to specific features.

2. Advanced Search:

Implement full-text search for recipes and ingredients.

3. Analytics:

Add features to analyze user activity, popular recipes, and ingredient usage.

4. Localization:

Support multiple languages for recipe instructions and ingredient names.

5. Deployment:

Deploy the application using cloud services like AWS, Azure, or Heroku.

