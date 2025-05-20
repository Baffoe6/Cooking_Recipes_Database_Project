// Format a date to a readable string (e.g., "May 20, 2025")
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
};

// Truncate text to a specified length and add ellipsis (e.g., "This is a long text..." for length 20)
export const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

// Format a number to include commas as thousands separators (e.g., 1234567 -> "1,234,567")
export const formatNumber = (number) => {
    return number.toLocaleString();
};

// Capitalize the first letter of a string (e.g., "hello" -> "Hello")
export const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};