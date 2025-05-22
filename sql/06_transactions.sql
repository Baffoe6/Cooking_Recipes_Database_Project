USE cooking_recipes_db;

-- Transaction: Add a New Recipe with Ingredients
BEGIN TRANSACTION;

-- Step 1: Insert a new recipe
INSERT INTO recipes (recipe_name, user_id, category_id, instructions)
VALUES ('Vegetable Stir Fry', 1, 2, '1. Chop vegetables. 2. Stir fry with sauce.');

-- Step 2: Get the last inserted recipe ID
SET @recipeId = LAST_INSERT_ID();

-- Step 3: Insert ingredients for the recipe
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
VALUES
(@recipeId, 5, 200, 'grams'), -- Vegetables
(@recipeId, 6, 50, 'ml'),    -- Soy Sauce
(@recipeId, 7, 20, 'ml');    -- Sesame Oil

-- Step 4: Commit the transaction
COMMIT;

-- Transaction: Add a Rating and Log the Action
BEGIN TRANSACTION;

-- Step 1: Insert a new rating
INSERT INTO ratings (recipe_id, user_id, rating, review)
VALUES (1, 2, 5, 'Amazing recipe! Easy to follow.');

-- Step 2: Get the last inserted rating ID
SET @ratingId = LAST_INSERT_ID();

-- Step 3: Log the action in the activity_logs table
INSERT INTO activity_logs (user_id, action, table_name, record_id, timestamp)
VALUES (2, 'Added a rating', 'ratings', @ratingId, NOW());

-- Step 4: Commit the transaction
COMMIT;

-- Transaction: Delete a Recipe and Its Dependencies
BEGIN TRANSACTION;

-- Step 1: Delete all associated ingredients
DELETE FROM recipe_ingredients WHERE recipe_id = 2;

-- Step 2: Delete all associated ratings
DELETE FROM ratings WHERE recipe_id = 2;

-- Step 3: Delete the recipe itself
DELETE FROM recipes WHERE recipe_id = 2;

-- Step 4: Commit the transaction
COMMIT;

-- Transaction: Add a Favorite and Log the Action
BEGIN TRANSACTION;

-- Step 1: Insert a new favorite
INSERT INTO favorites (user_id, recipe_id, created_at)
VALUES (3, 1, NOW());

-- Step 2: Get the last inserted favorite ID
SET @favoriteId = LAST_INSERT_ID();

-- Step 3: Log the action in the activity_logs table
INSERT INTO activity_logs (user_id, action, table_name, record_id, timestamp)
VALUES (3, 'Added a favorite', 'favorites', @favoriteId, NOW());

-- Step 4: Commit the transaction
COMMIT;