import {
    saveAuthToken,
    getAuthToken,
    clearAuthToken,
    isAuthenticated,
} from '../../../src/utils/auth';

describe('Auth Utility Functions', () => {
    const mockToken = 'mockAuthToken123';

    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    it('should save the authentication token to localStorage', () => {
        saveAuthToken(mockToken);
        expect(localStorage.getItem('authToken')).toBe(mockToken);
    });

    it('should retrieve the authentication token from localStorage', () => {
        localStorage.setItem('authToken', mockToken);
        const token = getAuthToken();
        expect(token).toBe(mockToken);
    });

    it('should clear the authentication token from localStorage', () => {
        localStorage.setItem('authToken', mockToken);
        clearAuthToken();
        expect(localStorage.getItem('authToken')).toBeNull();
    });

    it('should return true if the user is authenticated', () => {
        localStorage.setItem('authToken', mockToken);
        expect(isAuthenticated()).toBe(true);
    });

    it('should return false if the user is not authenticated', () => {
        expect(isAuthenticated()).toBe(false);
    });
});