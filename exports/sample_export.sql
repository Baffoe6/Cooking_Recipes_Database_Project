-- SQL Dump for Cooking Recipes Database Project
-- Exported on: May 17, 2025

-- Create the database
CREATE DATABASE IF NOT EXISTS cooking_recipes_db;
USE cooking_recipes_db;

-- Table: users
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (user_id, username, email, password_hash, created_at, updated_at) VALUES
(1, 'john_doe', 'john@example.com', 'hashed_password_1', NOW(), NOW()),
(2, 'jane_smith', 'jane@example.com', 'hashed_password_2', NOW(), NOW()),
(3, 'chef_mike', 'mike@example.com', 'hashed_password_3', NOW(), NOW());

-- Table: categories
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO categories (category_id, category_name, created_at, updated_at) VALUES
(1, 'Appetizers', NOW(), NOW()),
(2, 'Main Courses', NOW(), NOW()),
(3, 'Desserts', NOW(), NOW()),
(4, 'Beverages', NOW(), NOW());

-- Table: recipes
CREATE TABLE recipes (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_name VARCHAR(150) NOT NULL,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    instructions TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
);

INSERT INTO recipes (recipe_id, recipe_name, user_id, category_id, instructions, created_at, updated_at) VALUES
(1, 'Spaghetti Carbonara', 1, 2, '1. Boil pasta. 2. Cook pancetta. 3. Mix with eggs and cheese.', NOW(), NOW()),
(2, 'Chocolate Cake', 2, 3, '1. Mix ingredients. 2. Bake at 350°F for 30 minutes.', NOW(), NOW()),
(3, 'Margarita', 3, 4, '1. Mix tequila, lime juice, and triple sec. 2. Serve with ice.', NOW(), NOW());

-- Table: ingredients
CREATE TABLE ingredients (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    ingredient_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO ingredients (ingredient_id, ingredient_name, created_at, updated_at) VALUES
(1, 'Spaghetti', NOW(), NOW()),
(2, 'Pancetta', NOW(), NOW()),
(3, 'Eggs', NOW(), NOW()),
(4, 'Parmesan Cheese', NOW(), NOW()),
(5, 'Flour', NOW(), NOW()),
(6, 'Sugar', NOW(), NOW()),
(7, 'Cocoa Powder', NOW(), NOW()),
(8, 'Tequila', NOW(), NOW()),
(9, 'Lime Juice', NOW(), NOW()),
(10, 'Triple Sec', NOW(), NOW());

-- Table: recipe_ingredients
CREATE TABLE recipe_ingredients (
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id) ON DELETE CASCADE
);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(1, 1, 200, 'grams'),
(1, 2, 100, 'grams'),
(1, 3, 2, 'pieces'),
(1, 4, 50, 'grams'),
(2, 5, 200, 'grams'),
(2, 6, 100, 'grams'),
(2, 7, 50, 'grams'),
(3, 8, 50, 'ml'),
(3, 9, 25, 'ml'),
(3, 10, 25, 'ml');

-- Table: ratings
CREATE TABLE ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT NOT NULL,
    user_id INT NOT NULL,
    rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

INSERT INTO ratings (rating_id, recipe_id, user_id, rating, review, created_at, updated_at) VALUES
(1, 1, 2, 5, 'Delicious and easy to make!', NOW(), NOW()),
(2, 2, 1, 4, 'Great cake, but a bit too sweet for my taste.', NOW(), NOW()),
(3, 3, 3, 5, 'Perfect cocktail for a summer evening.', NOW(), NOW());