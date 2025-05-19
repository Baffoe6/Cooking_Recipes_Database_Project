import React, { useEffect, useState } from 'react';
import { getRatings, addRating } from '../api';

const Ratings = () => {
    const [ratings, setRatings] = useState([]);
    const [newRating, setNewRating] = useState({
        recipe_id: '',
        user_id: '',
        rating: '',
        review: '',
    });

    // Fetch ratings for a specific recipe (default recipe_id: 1 for demonstration)
    useEffect(() => {
        const recipeId = 1; // Replace with dynamic recipe_id if needed
        getRatings(recipeId)
            .then((response) => setRatings(response.data))
            .catch((error) => console.error('Error fetching ratings:', error));
    }, []);

    // Handle form submission to add a new rating
    const handleAddRating = (e) => {
        e.preventDefault();
        const { recipe_id, user_id, rating, review } = newRating;

        if (!recipe_id || !user_id || !rating) {
            alert('Recipe ID, User ID, and Rating are required.');
            return;
        }

        addRating({ recipe_id, user_id, rating, review })
            .then((response) => {
                setRatings([
                    ...ratings,
                    { rating_id: response.data.rating_id, recipe_id, user_id, rating, review },
                ]);
                setNewRating({ recipe_id: '', user_id: '', rating: '', review: '' });
            })
            .catch((error) => console.error('Error adding rating:', error));
    };

    return (
        <div>
            <h1>Ratings</h1>
            <ul>
                {ratings.map((rating) => (
                    <li key={rating.rating_id}>
                        <strong>Recipe ID:</strong> {rating.recipe_id}, <strong>User ID:</strong> {rating.user_id}, 
                        <strong>Rating:</strong> {rating.rating}, <strong>Review:</strong> {rating.review || 'No review'}
                    </li>
                ))}
            </ul>

            <h2>Add a New Rating</h2>
            <form onSubmit={handleAddRating}>
                <input
                    type="number"
                    value={newRating.recipe_id}
                    onChange={(e) => setNewRating({ ...newRating, recipe_id: e.target.value })}
                    placeholder="Recipe ID"
                />
                <input
                    type="number"
                    value={newRating.user_id}
                    onChange={(e) => setNewRating({ ...newRating, user_id: e.target.value })}
                    placeholder="User ID"
                />
                <input
                    type="number"
                    value={newRating.rating}
                    onChange={(e) => setNewRating({ ...newRating, rating: e.target.value })}
                    placeholder="Rating (1-5)"
                    min="1"
                    max="5"
                />
                <input
                    type="text"
                    value={newRating.review}
                    onChange={(e) => setNewRating({ ...newRating, review: e.target.value })}
                    placeholder="Review (optional)"
                />
                <button type="submit">Add Rating</button>
            </form>
        </div>
    );
};

export default Ratings;