/**
 * Extracts the file extension from a given filename.
 * Handles cases with multiple dots and special characters.
 * 
 * @param filename - The name of the file including extension
 * @returns The file extension without the dot, or empty string if no extension
 */
export function getFileExtension(filename: string): string {
    // Handle edge cases
    if (!filename || typeof filename !== 'string') {
        return '';
    }

    // Remove any leading/trailing whitespace
    const cleanFilename = filename.trim();

    // Handle filenames that start with a dot (hidden files)
    if (cleanFilename.startsWith('.') && !cleanFilename.slice(1).includes('.')) {
        return '';
    }

    // Split the filename by dots and get the last element
    const parts = cleanFilename.split('.');
    
    // Return empty string if no extension found
    if (parts.length <= 1) {
        return '';
    }

    // Get the last part (extension)
    const extension = parts[parts.length - 1];

    // Return lowercase extension
    return extension.toLowerCase();
}