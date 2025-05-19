import React, { useEffect, useState } from 'react';
import { getRecipes } from '../api';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipes()
            .then((response) => setRecipes(response.data))
            .catch((error) => console.error('Error fetching recipes:', error));
    }, []);

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.recipe_id}>
                        {recipe.recipe_name} - {recipe.instructions}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recipes;