import JSZip from 'jszip';
import { downloadBlob } from './downloadBlob';

/**
 * Generates a ZIP file from an array of PNG data URLs and triggers a download
 * @param pngs Array of PNG data URLs
 * @param filename Optional custom filename for the ZIP (defaults to 'snapshots.zip')
 */
export const generatePngsZip = async (pngs: Array<string>, filename: string = 'codevideo-png-snapshots.zip'): Promise<void> => {
  try {
    // Create a new JSZip instance
    const zip = new JSZip();
    
    // Add each PNG to the ZIP
    for (let i = 0; i < pngs.length; i++) {
      // Extract the base64 data from the data URL
      // Data URLs are formatted like: data:image/png;base64,BASE64_DATA
      const base64Data = pngs[i].split(',')[1];
      
      // Convert base64 to binary
      const binaryData = atob(base64Data);
      
      // Create a Uint8Array from the binary data
      const bytes = new Uint8Array(binaryData.length);
      for (let j = 0; j < binaryData.length; j++) {
        bytes[j] = binaryData.charCodeAt(j);
      }
      
      // Add the PNG to the ZIP with a numbered filename
      zip.file(`snapshot_${(i + 1).toString().padStart(3, '0')}.png`, bytes, { binary: true });
    }
    
    // Generate the ZIP file as a blob
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    
    // Trigger the download
    downloadBlob(zipBlob, filename);
    
    console.log(`ZIP file with ${pngs.length} PNG images has been created and download started.`);
  } catch (error) {
    console.error('Failed to generate ZIP file:', error);
  }
};