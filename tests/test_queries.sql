USE cooking_recipes_db;

-- 1. Retrieve all users
SELECT * FROM users;

-- 2. Retrieve all categories
SELECT * FROM categories;

-- 3. Retrieve all recipes
SELECT * FROM recipes;

-- 4. Retrieve all ingredients
SELECT * FROM ingredients;

-- 5. Retrieve all ratings
SELECT * FROM ratings;

-- 6. Retrieve all favorites
SELECT * FROM favorites;

-- 7. Retrieve all recipes in a specific category (e.g., 'Breakfast')
SELECT r.recipe_id, r.recipe_name, c.category_name, r.instructions
FROM recipes r
JOIN categories c ON r.category_id = c.category_id
WHERE c.category_name = 'Breakfast';

-- 8. Retrieve all ingredients for a specific recipe (e.g., 'Pancakes')
SELECT r.recipe_name, i.ingredient_name, ri.quantity, ri.unit
FROM recipes r
JOIN recipe_ingredients ri ON r.recipe_id = ri.recipe_id
JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
WHERE r.recipe_name = 'Pancakes';

-- 9. Retrieve all ratings for a specific recipe (e.g., 'Grilled Cheese Sandwich')
SELECT r.recipe_name, u.username, rt.rating, rt.review
FROM recipes r
JOIN ratings rt ON r.recipe_id = rt.recipe_id
JOIN users u ON rt.user_id = u.user_id
WHERE r.recipe_name = 'Grilled Cheese Sandwich';

-- 10. Retrieve the highest-rated recipes
SELECT r.recipe_id, r.recipe_name, AVG(rt.rating) AS average_rating
FROM recipes r
JOIN ratings rt ON r.recipe_id = rt.recipe_id
GROUP BY r.recipe_id, r.recipe_name
ORDER BY average_rating DESC
LIMIT 5;

-- 11. Retrieve the most popular recipes based on the number of favorites
SELECT r.recipe_id, r.recipe_name, COUNT(f.user_id) AS favorite_count
FROM recipes r
LEFT JOIN favorites f ON r.recipe_id = f.recipe_id
GROUP BY r.recipe_id, r.recipe_name
ORDER BY favorite_count DESC;

-- 12. Retrieve all recipes created by a specific user (e.g., 'test_user1')
SELECT r.recipe_id, r.recipe_name, r.instructions
FROM recipes r
JOIN users u ON r.user_id = u.user_id
WHERE u.username = 'test_user1';

-- 13. Retrieve all users who favorited a specific recipe (e.g., 'Spaghetti Bolognese')
SELECT u.username, r.recipe_name
FROM users u
JOIN favorites f ON u.user_id = f.user_id
JOIN recipes r ON f.recipe_id = r.recipe_id
WHERE r.recipe_name = 'Spaghetti Bolognese';

-- 14. Retrieve the total number of recipes in each category
SELECT c.category_name, COUNT(r.recipe_id) AS recipe_count
FROM categories c
LEFT JOIN recipes r ON c.category_id = r.category_id
GROUP BY c.category_id, c.category_name
ORDER BY recipe_count DESC;

-- 15. Retrieve all recipes along with their average rating
SELECT r.recipe_id, r.recipe_name, IFNULL(AVG(rt.rating), 'No Ratings') AS average_rating
FROM recipes r
LEFT JOIN ratings rt ON r.recipe_id = rt.recipe_id
GROUP BY r.recipe_id, r.recipe_name
ORDER BY average_rating DESC;