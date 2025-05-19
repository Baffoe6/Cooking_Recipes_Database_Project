USE cooking_recipes_db;

-- Insert test users
INSERT INTO users (username, email, password_hash) VALUES
('test_user1', 'test1@example.com', 'hashed_password_1'),
('test_user2', 'test2@example.com', 'hashed_password_2'),
('test_user3', 'test3@example.com', 'hashed_password_3');

-- Insert test categories
INSERT INTO categories (category_name) VALUES
('Breakfast'),
('Lunch'),
('Dinner'),
('Snacks');

-- Insert test recipes
INSERT INTO recipes (recipe_name, user_id, category_id, instructions) VALUES
('Pancakes', 1, 1, '1. Mix ingredients. 2. Cook on a skillet.'),
('Grilled Cheese Sandwich', 2, 2, '1. Butter bread. 2. Grill with cheese.'),
('Spaghetti Bolognese', 3, 3, '1. Cook pasta. 2. Prepare sauce. 3. Combine.');

-- Insert test ingredients
INSERT INTO ingredients (ingredient_name) VALUES
('Flour'),
('Eggs'),
('Milk'),
('Cheese'),
('Bread'),
('Pasta'),
('Tomato Sauce'),
('Ground Beef');

-- Insert test recipe ingredients
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(1, 1, 200, 'grams'), -- Pancakes: Flour
(1, 2, 2, 'pieces'),  -- Pancakes: Eggs
(1, 3, 300, 'ml'),    -- Pancakes: Milk
(2, 4, 100, 'grams'), -- Grilled Cheese Sandwich: Cheese
(2, 5, 2, 'slices'),  -- Grilled Cheese Sandwich: Bread
(3, 6, 200, 'grams'), -- Spaghetti Bolognese: Pasta
(3, 7, 150, 'ml'),    -- Spaghetti Bolognese: Tomato Sauce
(3, 8, 100, 'grams'); -- Spaghetti Bolognese: Ground Beef

-- Insert test ratings
INSERT INTO ratings (recipe_id, user_id, rating, review) VALUES
(1, 2, 5, 'Delicious and fluffy pancakes!'),
(2, 3, 4, 'Simple and tasty.'),
(3, 1, 5, 'Perfect comfort food.');

-- Insert test favorites
INSERT INTO favorites (user_id, recipe_id) VALUES
(1, 2), -- User 1 favorites Grilled Cheese Sandwich
(2, 3), -- User 2 favorites Spaghetti Bolognese
(3, 1); -- User 3 favorites Pancakes