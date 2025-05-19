 Cooking Recipes Database Project

A MySQL-based database system designed to manage users, recipes, ingredients, categories, and ratings efficiently. This project includes a backend API built with Node.js, a React-based frontend, and a structured database schema.

 Features

- User Management: Store user profiles and preferences securely.
- Recipe Management: Organize recipes with detailed instructions and ingredients.
- Ingredient Tracking: Maintain a database of ingredients with quantities and units.
- Categorization: Group recipes into categories for easy navigation.
- Ratings and Reviews: Allow users to rate and review recipes.
- Favorites: Enable users to mark recipes as favorites for quick access.

 Project Structure

Cooking_Recipes_Database_Project/
├── sql/
│   ├── 01_create_schema.sql          # Defines the database schema, tables, and relationships
│   ├── 02_insert_sample_data.sql     # Populates the database with sample data
│   ├── 03_queries.sql                # Example SQL queries for common operations
│   ├── migrations/                   # (Optional) Database migration scripts for version control
├── docs/
│   ├── ER_diagram.png                # Entity-Relationship diagram of the database
│   ├── project_report.md             # Detailed project report (optional)
│   ├── README.md                     # Documentation for the `docs` folder
├── exports/
│   ├── sample_export.sql             # Example database export for backup or sharing
│   ├── README.md                     # Documentation for the `exports` folder
├── src/                              # (Optional) Application source code (if applicable)
│   ├── backend/                      # Backend logic (e.g., Python, Node.js, etc.)
│   ├── frontend/                     # Frontend code (e.g., HTML, CSS, JavaScript)
├── tests/                            # (Optional) Test scripts for database and application
│   ├── test_queries.sql              # SQL scripts to test queries
│   ├── test_data.sql                 # SQL scripts to test sample data
├── LICENSE                           # License file (e.g., MIT License)
├── README.md                         # Main project documentation

 Getting Started

 Prerequisites

- Database Server: MySQL Server (8.x recommended)
- Backend: Node.js (16.x or later) with npm
- Frontend: React (18.x or later)
- Database IDE: MySQL Workbench or any compatible SQL IDE

 Setup Instructions

 Database
1. Clone or download this repository.
2. Open your MySQL IDE and connect to your MySQL server.
3. Execute the following scripts in order:
   - `sql/01_create_schema.sql`: Creates the database schema.
   - `sql/02_insert_sample_data.sql`: Inserts sample data into the database.
4. Use `sql/03_queries.sql` to run example queries and test the database.

 Backend
1. Navigate to the `src/backend` directory:
   ```bash
   cd src/backend
