import React from 'react';
import RatingStars from './RatingStars';

function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card">
            <h3>{recipe.recipe_name}</h3>
            <RatingStars rating={recipe.rating} />
            <p>{recipe.instructions.substring(0, 100)}...</p>
        </div>
    );
}

export default RecipeCard;