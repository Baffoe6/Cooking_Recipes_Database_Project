import React, { useEffect, useState } from 'react';
import { getCategories, addCategory } from '../api';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    // Fetch categories from the backend
    useEffect(() => {
        getCategories()
            .then((response) => setCategories(response.data))
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    // Handle form submission to add a new category
    const handleAddCategory = (e) => {
        e.preventDefault();
        if (!newCategory.trim()) {
            alert('Category name cannot be empty.');
            return;
        }

        addCategory({ category_name: newCategory })
            .then((response) => {
                setCategories([...categories, { category_id: response.data.category_id, category_name: newCategory }]);
                setNewCategory('');
            })
            .catch((error) => console.error('Error adding category:', error));
    };

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.category_id}>{category.category_name}</li>
                ))}
            </ul>

            <h2>Add a New Category</h2>
            <form onSubmit={handleAddCategory}>
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter category name"
                />
                <button type="submit">Add Category</button>
            </form>
        </div>
    );
};

export default Categories;