import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/recipes">Recipes</Link></li>
                <li><Link to="/ingredients">Ingredients</Link></li>
                <li><Link to="/categories">Categories</Link></li>
                <li><Link to="/ratings">Ratings</Link></li>
                <li><a href="/recipes">Recipes</a></li>
                {user?.role === 'admin' && <li><a href="/admin">Admin Dashboard</a></li>}
            </ul>
        </nav>
    );
};

export default Navbar;