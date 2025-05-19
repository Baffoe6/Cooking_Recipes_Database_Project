import React, { useEffect, useState } from 'react';
import { getIngredients } from '../api';

const Ingredients = () => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        getIngredients()
            .then((response) => setIngredients(response.data))
            .catch((error) => console.error('Error fetching ingredients:', error));
    }, []);

    return (
        <div>
            <h1>Ingredients</h1>
            <ul>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.ingredient_id}>{ingredient.ingredient_name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Ingredients;