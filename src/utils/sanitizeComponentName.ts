/**
 * Sanitizes a string to be used as a React component name InCapitalizeCamelCase
 * Converts to CapitalizedCamelCase and removes invalid characters
 * @param input The string to sanitize
 * @returns A valid React component name
 */
export const sanitizeComponentName = (input: string): string => {
    if (!input) return "Component";

    // Remove any non-alphanumeric characters
    const alphanumeric = input.replace(/[^a-zA-Z0-9\s]/g, "");

    // Split into words, capitalize each word, and join
    const componentName = alphanumeric
        .trim()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join("");

    // Ensure the first character is uppercase
    return componentName.charAt(0).toUpperCase() + componentName.slice(1);
};