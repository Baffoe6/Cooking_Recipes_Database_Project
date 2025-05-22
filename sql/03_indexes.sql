USE cooking_recipes_db;

-- Index for faster searches on recipe names
CREATE INDEX idx_recipe_name ON recipes(recipe_name);

-- Index for filtering recipes by category
CREATE INDEX idx_category_id ON recipes(category_id);

-- Index for filtering recipes by user
CREATE INDEX idx_user_id ON recipes(user_id);

-- Index for faster ingredient name searches
CREATE INDEX idx_ingredient_name ON ingredients(ingredient_name);

-- Composite index for recipe ingredients (recipe_id + ingredient_id)
CREATE INDEX idx_recipe_ingredient ON recipe_ingredients(recipe_id, ingredient_id);

-- Index for filtering ratings by recipe
CREATE INDEX idx_rating_recipe_id ON ratings(recipe_id);

-- Index for filtering ratings by user
CREATE INDEX idx_rating_user_id ON ratings(user_id);

-- Index for filtering favorites by user
CREATE INDEX idx_favorite_user_id ON favorites(user_id);

-- Index for filtering favorites by recipe
CREATE INDEX idx_favorite_recipe_id ON favorites(recipe_id);

-- Index for activity logs by user
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);

-- Index for activity logs by table name
CREATE INDEX idx_activity_logs_table_name ON activity_logs(table_name);