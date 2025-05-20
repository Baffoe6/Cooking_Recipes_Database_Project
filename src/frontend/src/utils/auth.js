// Save the authentication token to local storage
export const saveAuthToken = (token) => {
    localStorage.setItem('authToken', token);
};

// Retrieve the authentication token from local storage
export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Remove the authentication token from local storage
export const clearAuthToken = () => {
    localStorage.removeItem('authToken');
};

// Check if the user is authenticated
export const isAuthenticated = () => {
    const token = getAuthToken();
    return !!token; // Returns true if a token exists, false otherwise
};