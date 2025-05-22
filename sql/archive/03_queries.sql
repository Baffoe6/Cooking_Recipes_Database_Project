USE cooking_recipes_db;

-- 1. Insert Query
INSERT INTO Recipes (title, description, category_id, user_id)
VALUES ('Avocado Toast', 'A simple and healthy avocado toast recipe.', 1, 2);

-- 2. Update Query using key column
UPDATE Recipes
SET description = 'A delicious and upgraded spaghetti carbonara recipe.'
WHERE recipe_id = (
    SELECT recipe_id FROM (SELECT TOP 1 recipe_id FROM Recipes WHERE title = 'Spaghetti Carbonara') AS temp
);

-- 3. Delete Query using key column
DELETE FROM Recipes
WHERE recipe_id = (
    SELECT recipe_id FROM (SELECT TOP 1 recipe_id FROM Recipes WHERE title = 'Classic Pancakes') AS temp
);

-- 4. Select with Filtering
SELECT *
FROM Recipes
WHERE category_id = 2
  AND title LIKE '%Chocolate%';

-- 5. Join Query
SELECT r.title AS Recipe, i.name AS Ingredient
FROM Recipes r
JOIN Recipe_Ingredients ri ON r.recipe_id = ri.recipe_id
JOIN Ingredients i ON ri.ingredient_id = i.ingredient_id
ORDER BY r.title;

-- 6. Aggregation Query
SELECT TOP 1 r.title, AVG(rt.rating_value) AS AverageRating
FROM Recipes r
JOIN Ratings rt ON r.recipe_id = rt.recipe_id
GROUP BY r.recipe_id
ORDER BY AverageRating DESC;

-- 7. Subquery
SELECT user_id, name
FROM Users
WHERE user_id IN (
    SELECT user_id
    FROM Recipes
    GROUP BY user_id
    HAVING COUNT(*) > 5
);

-- 1. Retrieve all recipes in a specific category (e.g., 'Desserts')
SELECT r.recipe_id, r.title AS recipe_name, c.name AS category_name, r.description AS instructions
FROM recipes r
JOIN categories c ON r.category_id = c.category_id
WHERE c.name = 'Desserts';

-- 2. Find the highest-rated recipes
SELECT TOP 5 r.recipe_id, r.title AS recipe_name, AVG(rt.rating_value) AS average_rating
FROM recipes r
JOIN ratings rt ON r.recipe_id = rt.recipe_id
GROUP BY r.recipe_id, r.title
ORDER BY average_rating DESC;

-- 3. List all ingredients required for a specific recipe (e.g., 'Spaghetti Carbonara')
SELECT r.title AS recipe_name, i.name AS ingredient_name, ri.quantity, ri.unit
FROM recipes r
JOIN recipe_ingredients ri ON r.recipe_id = ri.recipe_id
JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
WHERE r.title = 'Spaghetti Carbonara';

-- 4. Get all recipes created by a specific user (e.g., 'john_doe')
SELECT r.recipe_id, r.title AS recipe_name, r.description AS instructions
FROM recipes r
JOIN users u ON r.user_id = u.user_id
WHERE u.username = 'john_doe';

-- 5. Retrieve all reviews for a specific recipe (e.g., 'Chocolate Cake')
SELECT r.title AS recipe_name, u.username, rt.rating_value AS rating, rt.review
FROM recipes r
JOIN ratings rt ON r.recipe_id = rt.recipe_id
JOIN users u ON rt.user_id = u.user_id
WHERE r.title = 'Chocolate Cake';

-- 6. Find the most popular categories based on the number of recipes
SELECT c.name AS category_name, COUNT(r.recipe_id) AS recipe_count
FROM categories c
LEFT JOIN recipes r ON c.category_id = r.category_id
GROUP BY c.category_id, c.name
ORDER BY recipe_count DESC;

-- 7. List all recipes along with their average rating
SELECT r.recipe_id, r.title AS recipe_name, IFNULL(AVG(rt.rating_value), 'No Ratings') AS average_rating
FROM recipes r
LEFT JOIN ratings rt ON r.recipe_id = rt.recipe_id
GROUP BY r.recipe_id, r.title
ORDER BY average_rating DESC;

-- 8. Find users who have rated a specific recipe (e.g., 'Margarita')
SELECT u.username, rt.rating_value AS rating, rt.review
FROM users u
JOIN ratings rt ON u.user_id = rt.user_id
JOIN recipes r ON rt.recipe_id = r.recipe_id
WHERE r.title = 'Margarita';

-- 9. Retrieve all recipes along with their total number of ratings
SELECT r.recipe_id, r.title AS recipe_name, COUNT(rt.rating_id) AS total_ratings
FROM recipes r
LEFT JOIN ratings rt ON r.recipe_id = rt.recipe_id
GROUP BY r.recipe_id, r.title
ORDER BY total_ratings DESC;

-- 10. Find recipes that use a specific ingredient (e.g., 'Eggs')
SELECT r.recipe_id, r.title AS recipe_name
FROM recipes r
JOIN recipe_ingredients ri ON r.recipe_id = ri.recipe_id
JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
WHERE i.name = 'Eggs';

-- 11. Retrieve all recipes along with their ingredients
SELECT r.title AS recipe_name, i.name AS ingredient_name, ri.quantity, ri.unit
FROM recipes r
JOIN recipe_ingredients ri ON r.recipe_id = ri.recipe_id
JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
ORDER BY r.title, i.name;

-- Retrieve all activity logs
SELECT * FROM activity_logs ORDER BY timestamp DESC;

-- Retrieve activity logs for a specific user
SELECT * FROM activity_logs WHERE user_id = 1 ORDER BY timestamp DESC;
