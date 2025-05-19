USE cooking_recipes_db;

-- Insert Sample Users
INSERT INTO users (username, email, password_hash) VALUES
('john_doe', 'john@example.com', 'hashed_password_1'),
('jane_smith', 'jane@example.com', 'hashed_password_2'),
('chef_mike', 'mike@example.com', 'hashed_password_3');

-- Insert Sample Categories
INSERT INTO categories (category_name) VALUES
('Appetizers'),
('Main Courses'),
('Desserts'),
('Beverages');

-- Insert Sample Recipes
INSERT INTO recipes (recipe_name, user_id, category_id, instructions) VALUES
('Spaghetti Carbonara', 1, 2, '1. Boil pasta. 2. Cook pancetta. 3. Mix with eggs and cheese.'),
('Chocolate Cake', 2, 3, '1. Mix ingredients. 2. Bake at 350°F for 30 minutes.'),
('Margarita', 3, 4, '1. Mix tequila, lime juice, and triple sec. 2. Serve with ice.');

-- Insert Sample Ingredients
INSERT INTO ingredients (ingredient_name) VALUES
('Spaghetti'),
('Pancetta'),
('Eggs'),
('Parmesan Cheese'),
('Flour'),
('Sugar'),
('Cocoa Powder'),
('Tequila'),
('Lime Juice'),
('Triple Sec');

-- Insert Sample Recipe Ingredients
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(1, 1, 200, 'grams'), -- Spaghetti Carbonara: Spaghetti
(1, 2, 100, 'grams'), -- Spaghetti Carbonara: Pancetta
(1, 3, 2, 'pieces'),  -- Spaghetti Carbonara: Eggs
(1, 4, 50, 'grams'),  -- Spaghetti Carbonara: Parmesan Cheese
(2, 5, 200, 'grams'), -- Chocolate Cake: Flour
(2, 6, 100, 'grams'), -- Chocolate Cake: Sugar
(2, 7, 50, 'grams'),  -- Chocolate Cake: Cocoa Powder
(3, 8, 50, 'ml'),     -- Margarita: Tequila
(3, 9, 25, 'ml'),     -- Margarita: Lime Juice
(3, 10, 25, 'ml');    -- Margarita: Triple Sec

-- Insert Sample Ratings
INSERT INTO ratings (recipe_id, user_id, rating, review) VALUES
(1, 2, 5, 'Delicious and easy to make!'),
(2, 1, 4, 'Great cake, but a bit too sweet for my taste.'),
(3, 3, 5, 'Perfect cocktail for a summer evening.');

-- Insert Sample Favorites
INSERT INTO favorites (user_id, recipe_id) VALUES
(1, 2), -- User 1 favorites Grilled Cheese Sandwich
(2, 3), -- User 2 favorites Spaghetti Bolognese
(3, 1); -- User 3 favorites Pancakes

-- Insert sample activity logs
INSERT INTO activity_logs (user_id, action, table_name, record_id) VALUES
(1, 'Created a new recipe', 'recipes', 1),
(2, 'Updated a recipe', 'recipes', 2),
(3, 'Deleted a recipe', 'recipes', 3);
