import React from 'react';
import './RatingStars.css'; // Optional: Add styles for the stars

function RatingStars({ rating, maxStars = 5 }) {
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
        stars.push(
            <span key={i} className={i <= rating ? 'star filled' : 'star'}>
                ★
            </span>
        );
    }

    return <div className="rating-stars">{stars}</div>;
}

export default RatingStars;