 Cooking Recipes Database - Frontend

This is the frontend of the Cooking Recipes Database Project, built using React. It provides a user-friendly interface for browsing, managing, and interacting with recipes, ingredients, and user profiles.

---

 Features

- Home Page: Welcome page with an introduction to the application.
- Recipes Page: Browse all recipes with detailed instructions and ingredients.
- Recipe Details Page: View detailed information about a specific recipe.
- User Authentication: Login and signup functionality for users.
- Responsive Design: Optimized for both desktop and mobile devices.

---

 Folder Structure

```
src/frontend/
├── public/                         # Static assets
│   ├── index.html                  # Main HTML file
│   ├── favicon.ico                 # Favicon for the app
├── src/                            # React application source code
│   ├── components/                 # Reusable React components
│   │   ├── Navbar.js               # Navigation bar component
│   │   ├── RecipeCard.js           # Component to display a recipe card
│   │   ├── RatingStars.js          # Component for displaying ratings
│   ├── pages/                      # Page components for different routes
│   │   ├── HomePage.js             # Homepage component
│   │   ├── RecipesPage.js          # Recipes listing page
│   │   ├── RecipeDetailsPage.js    # Recipe details page
│   │   ├── LoginPage.js            # Login page
│   │   ├── SignupPage.js           # Signup page
│   ├── services/                   # API service functions
│   │   ├── api.js                  # Functions for making API calls
│   ├── App.js                      # Main React application file
│   ├── index.js                    # React entry point
│   ├── styles/                     # CSS or SCSS files
│   │   ├── App.css                 # Global styles
│   │   ├── Navbar.css              # Styles for the Navbar component
│   │   ├── RecipeCard.css          # Styles for the RecipeCard component
│   ├── utils/                      # Utility functions
│   │   ├── auth.js                 # Authentication helpers (e.g., token management)
│   │   ├── format.js               # Formatting helpers (e.g., date or text formatting)
├── package.json                    # Project metadata and dependencies
├── README.md                       # Documentation for the frontend
```



 Getting Started

 Prerequisites

Ensure you have the following installed on your system:
- Node.js (16.x or later)
- npm (Node Package Manager)



 Installation

1. Navigate to the frontend directory:
   ```bash
   cd src/frontend
   ```
2. Install dependencies:
        npm install

3. Start the development server:
        npm start

4. Open the app in your browser at http://localhost:3000.


Available Scripts

In the project directory, you can run:

        npm start

Runs the app in development mode. Open http://localhost:3000 to view it in the browser.

    npm test
Launches the test runner in interactive watch mode.

    npm run build

Builds the app for production to the build folder. It bundles React in production mode and optimizes the build for the best performance.

    API Integration
    
The frontend interacts with the backend API to fetch and manage data. The API base URL is configured in the services/api.js file:

     const API_BASE_URL = 'http://localhost:3000/api';

Update the API_BASE_URL if your backend is hosted on a different server.

Testing
This project uses Jest and React Testing Library for testing.

Running Tests
Run the following command to execute tests:
   npm test

Test Folder Structure

src/frontend/tests/
├── components/                 # Tests for reusable components
├── pages/                      # Tests for page components
├── services/                   # Tests for API service functions
├── utils/                      # Tests for utility functions

Deployment

To deploy the frontend, build the project using:
   npm run build

The production-ready files will be available in the build/ folder. You can deploy these files to any static hosting service like Netlify, Vercel, or GitHub Pages.

Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and submit a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Future Improvements
1. Search Functionality: Add a search bar to filter recipes by name or ingredients.
2. User Profiles: Allow users to view and edit their profiles.
3. Dark Mode: Add a toggle for light/dark mode.
4. Pagination: Implement pagination for large recipe lists.
5. Error Handling: Improve error handling for API calls.


