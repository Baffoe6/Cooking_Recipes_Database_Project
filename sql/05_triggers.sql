USE cooking_recipes_db;

-- Trigger: Log Recipe Insertions
CREATE TRIGGER after_recipe_insert
AFTER INSERT ON recipes
FOR EACH ROW
BEGIN
    INSERT INTO activity_logs (user_id, action, table_name, record_id, timestamp)
    VALUES (NEW.user_id, 'Added a new recipe', 'recipes', NEW.recipe_id, NOW());
END;

DELIMITER $$
CREATE TRIGGER after_recipe_update
AFTER UPDATE ON recipes
FOR EACH ROW
BEGIN
    INSERT INTO activity_logs (user_id, action, table_name, record_id, timestamp)
    VALUES (NEW.user_id, 'Updated a recipe', 'recipes', NEW.recipe_id, NOW());
END$$
DELIMITER $$
CREATE TRIGGER after_recipe_delete
AFTER DELETE ON recipes
FOR EACH ROW
BEGIN
    INSERT INTO activity_logs (user_id, action, table_name, record_id, timestamp)
    VALUES (OLD.user_id, 'Deleted a recipe', 'recipes', OLD.recipe_id, NOW());
END$$
DELIMITER ;
    SET NEW.updated_at = NOW();
DELIMITER $$

CREATE TRIGGER after_rating_insert
DELIMITER $$
CREATE TRIGGER after_rating_insert
AFTER INSERT ON ratings
FOR EACH ROW
BEGIN
    INSERT INTO activity_logs (user_id, action, table_name, record_id, timestamp)
    VALUES (NEW.user_id, 'Added a rating', 'ratings', NEW.rating_id, NOW());
END$$
DELIMITER ;
DELIMITER ;RE UPDATE ON recipes
FOR EACH ROW
BEGIN
    SET NEW.updated_at = NOW();
END;

CREATE TRIGGER after_rating_insert
FOR INSERT ON ratings
FOR EACH ROW
BEGIN
    INSERT INTO activity_logs (user_id, action, table_name, record_id, timestamp)
    VALUES (NEW.user_id, 'Added a rating', 'ratings', NEW.rating_id, NOW());
END;

CREATE TRIGGER after_favorite_insert
FOR INSERT ON favorites
FOR EACH ROW
BEGIN
    INSERT INTO activity_logs (user_id, action, table_name, record_id, timestamp)
    VALUES (NEW.user_id, 'Added a favorite', 'favorites', NEW.favorite_id, NOW());
END;