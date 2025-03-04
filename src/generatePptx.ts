import pptxgen from 'pptxgenjs';

/**
 * Generates a PowerPoint presentation file and triggers browser download
 * @param pptxContent A function that populates the presentation with content
 * @param filename Name for the downloaded file (without extension)
 */
export const generatePptx = async (
  pptxContent: (pres: pptxgen) => void, 
  filename: string = 'codevideo-export'
): Promise<void> => {
  // Create a new PowerPoint presentation
  const pres = new pptxgen();
  
  // Set default slide properties
  pres.layout = 'LAYOUT_16x9';
  
  // Apply the content to the presentation
  pptxContent(pres);
  
  // Clean the filename
  const cleanFilename = filename
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    || 'codevideo-export';
  
  // Generate the PPTX
  pres.writeFile({ 
    fileName: `${cleanFilename}.pptx` 
  });
  
//   // Create download link
//   const url = URL.createObjectURL(blob);
  
//   try {
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `${cleanFilename}.pptx`;
//     link.click();
//   } finally {
//     URL.revokeObjectURL(url);
//   }
};