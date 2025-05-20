import {
    formatDate,
    truncateText,
    formatNumber,
    capitalizeFirstLetter,
} from '../../../src/utils/format';

describe('Format Utility Functions', () => {
    it('should format a date to a readable string', () => {
        const date = '2025-05-20';
        expect(formatDate(date)).toBe('May 20, 2025');
    });

    it('should truncate text to the specified length and add ellipsis', () => {
        const text = 'This is a very long description of a recipe.';
        expect(truncateText(text, 20)).toBe('This is a very long...');
        expect(truncateText(text, 50)).toBe(text); // No truncation if text is shorter than maxLength
    });

    it('should format a number with commas as thousands separators', () => {
        const number = 1234567;
        expect(formatNumber(number)).toBe('1,234,567');
    });

    it('should capitalize the first letter of a string', () => {
        const string = 'hello world';
        expect(capitalizeFirstLetter(string)).toBe('Hello world');
    });

    it('should return an empty string if input is undefined or empty', () => {
        expect(capitalizeFirstLetter('')).toBe('');
        expect(capitalizeFirstLetter(undefined)).toBe('');
    });
});