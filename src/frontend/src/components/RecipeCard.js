import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card">
            <h3>{recipe.recipe_name}</h3>
            <p>{recipe.instructions.substring(0, 100)}...</p>
            <Link to={`/recipes/${recipe.recipe_id}`}>View Details</Link>
        </div>
    );
}

export default RecipeCard;