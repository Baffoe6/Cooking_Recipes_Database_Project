import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { getRecipes } from '../services/api';

function RecipesPage() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchRecipes() {
            const data = await getRecipes();
            setRecipes(data);
        }
        fetchRecipes();
    }, []);

    return (
        <div>
            <h2>Recipes</h2>
            <div className="recipes-grid">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.recipe_id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}

export default RecipesPage;