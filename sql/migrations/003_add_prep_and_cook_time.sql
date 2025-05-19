-- Migration 003: Add Prep Time and Cook Time to Recipes
USE cooking_recipes_db;

ALTER TABLE recipes
ADD COLUMN prep_time INT DEFAULT NULL COMMENT 'Preparation time in minutes',
ADD COLUMN cook_time INT DEFAULT NULL COMMENT 'Cooking time in minutes';