import { toPng } from 'html-to-image';
import { downloadBlob } from '../../utils/downloadBlob';

const FILE_EXPLORER_ID = 'file-explorer';
const EDITOR_ID = 'editor';
const TERMINAL_ID = 'terminal';
const EDITOR_AREA_ID = 'editor-area';

/**
 * Captures a PNG of a DOM element by data-codevideo-id
 * @param componentId The data-codevideo-id to capture
 * @param filename Optional filename for the PNG
 */
export const exportComponentPng = async (
  componentId: string,
  filename: string = `codevideo-${componentId}.png`
): Promise<void> => {
  try {
    // Find the component by data-codevideo-id
    const element = document.querySelector(`[data-codevideo-id="${componentId}"]`);
    
    if (!element) {
      console.warn(`Element with data-codevideo-id="${componentId}" not found`);
      return;
    }
    
    // Convert to PNG
    const dataUrl = await toPng(element as HTMLElement);
    
    // Convert data URL to blob
    const base64Data = dataUrl.split(',')[1];
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'image/png' });
    
    // Trigger download
    downloadBlob(blob, filename);
    
    console.log(`PNG export of ${componentId} completed`);
  } catch (error) {
    console.error(`Failed to export ${componentId} as PNG:`, error);
  }
};

/**
 * Exports the file explorer as a PNG
 * @param filename Optional custom filename
 */
export const exportFileExplorerPng = async (
  filename: string = 'codevideo-file-explorer.png'
): Promise<void> => {
  return exportComponentPng(FILE_EXPLORER_ID, filename);
};

/**
 * Exports just the editor as a PNG (not including tabs)
 * @param filename Optional custom filename
 */
export const exportEditorPng = async (
  filename: string = 'codevideo-editor.png'
): Promise<void> => {
  return exportComponentPng(EDITOR_ID, filename);
};

/**
 * Exports the terminal as a PNG
 * @param filename Optional custom filename
 */
export const exportTerminalPng = async (
  filename: string = 'codevideo-terminal.png'
): Promise<void> => {
  return exportComponentPng(TERMINAL_ID, filename);
};

/**
 * Exports the editor area including tabs as a PNG
 * @param filename Optional custom filename
 */
export const exportEditorAreaPng = async (
  filename: string = 'codevideo-editor-area.png'
): Promise<void> => {
  // Using the editor-area data-codevideo-id that will be added to the component
  return exportComponentPng(EDITOR_AREA_ID, filename);
};