/**
 * Creates a temporary download link for a blob and triggers the download
 * @param blob The blob to download
 * @param filename The name to give the downloaded file
 */
export const downloadBlob = (blob: Blob, filename: string): void => {
    const url = URL.createObjectURL(blob);
    try {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
    } finally {
        URL.revokeObjectURL(url);
    }
};