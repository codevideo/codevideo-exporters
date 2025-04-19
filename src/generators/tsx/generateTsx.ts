import { sanitizeComponentName } from "../../utils/sanitizeComponentName";

/**
 * Triggers a download of a TSX file.
 * @param tsxString The TSX content to download.
 * @param baseName The base name to use for the file (will be sanitized).
 */
export const generateTsx = async (tsxString: string, baseName: string = "Component") => {
    const componentName = sanitizeComponentName(baseName);
    const fileName = `${componentName}.tsx`;
  
    // Create a blob with the TSX content
    const blob = new Blob([tsxString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
  
    // Create a temporary anchor element and trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
  
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };