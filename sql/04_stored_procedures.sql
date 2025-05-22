USE cooking_recipes_db;
GO

-- Stored Procedure: Get Recipes by User
CREATE PROCEDURE GetUserRecipes(@userId INT)
AS
BEGIN
    SELECT r.recipe_id, r.recipe_name, r.instructions, c.category_name
    FROM recipes r
    JOIN categories c ON r.category_id = c.category_id
    WHERE r.user_id = @userId;
END;
GO

-- Stored Procedure: Add a New Recipe
CREATE PROCEDURE AddRecipe
    @recipeName VARCHAR(150),
    @userId INT,
    @categoryId INT,
    @instructions TEXT
AS
BEGIN
    INSERT INTO recipes (recipe_name, user_id, category_id, instructions)
    VALUES (@recipeName, @userId, @categoryId, @instructions);
END;
GO

CREATE PROCEDURE UpdateRecipe
    @recipeId INT,
    @recipeName VARCHAR(150),
    @categoryId INT,
    @instructions TEXT
AS
BEGIN
    UPDATE recipes
    SET recipe_name = @recipeName,
        category_id = @categoryId,
        instructions = @instructions,
        updated_at = GETDATE()
    WHERE recipe_id = @recipeId;
END;
GO

CREATE PROCEDURE DeleteRecipe
    @recipeId INT
AS
BEGIN
    DELETE FROM recipes WHERE recipe_id = @recipeId;
END;
GO

CREATE PROCEDURE GetTopRatedRecipes
    @limitCount INT
AS
BEGIN
    SELECT TOP (@limitCount) r.recipe_id, r.recipe_name, AVG(rt.rating) AS average_rating
    FROM recipes r
    JOIN ratings rt ON r.recipe_id = rt.recipe_id
    GROUP BY r.recipe_id, r.recipe_name
    ORDER BY average_rating DESC;
END;
GO

CREATE PROCEDURE GetRecipeIngredients
    @recipeId INT
AS
BEGIN
    SELECT i.ingredient_name, ri.quantity, ri.unit
    FROM recipe_ingredients ri
    JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
    WHERE ri.recipe_id = @recipeId;
END;
GO

CREATE PROCEDURE AddRating
    @recipeId INT,
    @userId INT,
    @ratingValue TINYINT,
    @reviewText TEXT
AS
BEGIN
    INSERT INTO ratings (recipe_id, user_id, rating, review)
    VALUES (@recipeId, @userId, @ratingValue, @reviewText);
END;
GO