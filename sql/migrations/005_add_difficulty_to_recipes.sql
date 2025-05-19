-- Migration 005: Add Difficulty to Recipes
USE cooking_recipes_db;

ALTER TABLE recipes
ADD COLUMN difficulty ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Easy' COMMENT 'Difficulty level of the recipe';