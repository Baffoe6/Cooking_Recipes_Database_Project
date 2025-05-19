-- Migration 004: Add Image URL to Recipes
USE cooking_recipes_db;

ALTER TABLE recipes
ADD COLUMN image_url VARCHAR(255) DEFAULT NULL COMMENT 'URL of the recipe image';