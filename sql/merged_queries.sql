USE cooking_recipes_db;

-- ============================================
-- SECTION 1: CRUD OPERATIONS
-- ============================================

-- 1. Insert a New Recipe
INSERT INTO recipes (recipe_name, instructions, category_id, user_id)
VALUES ('Avocado Toast', 'A simple and healthy avocado toast recipe.', 1, 2);

-- 2. Update a Recipe Description
UPDATE recipes
SET instructions = 'A delicious and upgraded spaghetti carbonara recipe.'
WHERE recipe_id = (
    SELECT TOP 1 recipe_id FROM recipes WHERE recipe_name = 'Spaghetti Carbonara'
);

-- 3. Delete a Recipe by Name
DELETE FROM recipes
WHERE recipe_id = (
    SELECT TOP 1 recipe_id FROM recipes WHERE recipe_name = 'Classic Pancakes'
);

-- ============================================
-- SECTION 2: ANALYTICS AND REPORTING QUERIES
-- ============================================

-- 1. Retrieve all recipes with their categories, authors, and average ratings
SELECT 
    r.recipe_id,
    r.recipe_name,
    r.instructions,
    c.category_name,
    u.username AS author,
    IFNULL(AVG(rt.rating), 0) AS average_rating,
    COUNT(rt.rating) AS total_ratings,
    r.created_at
FROM recipes r
JOIN categories c ON r.category_id = c.category_id
JOIN users u ON r.user_id = u.user_id
LEFT JOIN ratings rt ON r.recipe_id = rt.recipe_id
GROUP BY r.recipe_id, r.recipe_name, c.category_name, u.username, r.created_at
ORDER BY r.created_at DESC;

-- 2. Retrieve top-rated recipes with their average ratings
SELECT TOP 10
    r.recipe_id,
    r.recipe_name,
    AVG(rt.rating) AS average_rating,
    COUNT(rt.rating) AS total_ratings
FROM recipes r
JOIN ratings rt ON r.recipe_id = rt.recipe_id
GROUP BY r.recipe_id, r.recipe_name
HAVING COUNT(rt.rating) > 0
ORDER BY average_rating DESC, total_ratings DESC;

-- 3. Retrieve all ingredients for a specific recipe
SELECT 
    r.recipe_name,
    i.ingredient_name,
    ri.quantity,
    ri.unit
FROM recipe_ingredients ri
JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
JOIN recipes r ON ri.recipe_id = r.recipe_id
WHERE r.recipe_id = 1; -- Replace 1 with the desired recipe_id

-- 4. Retrieve all recipes in a specific category
SELECT 
    r.recipe_id,
    r.recipe_name,
    r.instructions,
    c.category_name
FROM recipes r
JOIN categories c ON r.category_id = c.category_id
WHERE c.category_name = 'Desserts'; -- Replace 'Desserts' with the desired category name

-- 5. Retrieve all recipes favorited by a specific user
SELECT 
    f.favorite_id,
    r.recipe_id,
    r.recipe_name,
    u.username AS favorited_by,
    f.created_at
FROM favorites f
JOIN recipes r ON f.recipe_id = r.recipe_id
JOIN users u ON f.user_id = u.user_id
WHERE u.user_id = 1; -- Replace 1 with the desired user_id

-- 6. Retrieve the most active users (based on the number of recipes created)
SELECT 
    u.user_id,
    u.username,
    COUNT(r.recipe_id) AS total_recipes
FROM users u
LEFT JOIN recipes r ON u.user_id = r.user_id
GROUP BY u.user_id, u.username
ORDER BY total_recipes DESC
OFFSET 0 ROWS FETCH NEXT 5 ROWS ONLY;

-- 7. Retrieve the most popular ingredients (used in the most recipes)
SELECT 
    i.ingredient_name,
    COUNT(ri.recipe_id) AS total_recipes
FROM ingredients i
JOIN recipe_ingredients ri ON i.ingredient_id = ri.ingredient_id
GROUP BY i.ingredient_id, i.ingredient_name
ORDER BY total_recipes DESC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;

-- 8. Retrieve the most recent activity logs
SELECT 
    al.log_id,
    u.username,
    al.action,
    al.table_name,
    al.record_id,
    al.timestamp
FROM activity_logs al
LEFT JOIN users u ON al.user_id = u.user_id
ORDER BY al.timestamp DESC
OFFSET 0 ROWS FETCH NEXT 20 ROWS ONLY;

-- 9. Retrieve recipes with no ratings
SELECT 
    r.recipe_id,
    r.recipe_name,
    r.instructions
FROM recipes r
LEFT JOIN ratings rt ON r.recipe_id = rt.recipe_id
WHERE rt.rating_id IS NULL;

-- 10. Retrieve the average rating for each category
SELECT 
    c.category_name,
    IFNULL(AVG(rt.rating), 0) AS average_rating
FROM categories c
LEFT JOIN recipes r ON c.category_id = r.category_id
LEFT JOIN ratings rt ON r.recipe_id = rt.recipe_id
GROUP BY c.category_id, c.category_name
ORDER BY average_rating DESC;

-- ============================================
-- SECTION 3: SPECIFIC USE CASE QUERIES
-- ============================================

-- 1. Find users who have rated a specific recipe (e.g., 'Margarita')
SELECT u.username, rt.rating AS rating, rt.review
FROM users u
JOIN ratings rt ON u.user_id = rt.user_id
JOIN recipes r ON rt.recipe_id = r.recipe_id
WHERE r.recipe_name = 'Margarita';

-- 2. Retrieve all recipes along with their total number of ratings
SELECT r.recipe_id, r.recipe_name, COUNT(rt.rating_id) AS total_ratings
FROM recipes r
LEFT JOIN ratings rt ON r.recipe_id = rt.recipe_id
GROUP BY r.recipe_id, r.recipe_name
ORDER BY total_ratings DESC;

-- 3. Find recipes that use a specific ingredient (e.g., 'Eggs')
SELECT r.recipe_id, r.recipe_name
FROM recipes r
JOIN recipe_ingredients ri ON r.recipe_id = ri.recipe_id
JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
WHERE i.ingredient_name = 'Eggs';

-- 4. Retrieve all recipes along with their ingredients
SELECT r.recipe_name, i.ingredient_name, ri.quantity, ri.unit
FROM recipes r
JOIN recipe_ingredients ri ON r.recipe_id = ri.recipe_id
JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
ORDER BY r.recipe_name, i.ingredient_name;