import { convertToHtml } from "../../converters/convertToHtml";

export const generatePdf = async (markdown: string) => {
  const fullHtml = await convertToHtml(markdown, {
    isPdf: true,
    title: 'CodeVideo PDF Export'
  });

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    console.error('Failed to open print window');
    return;
  }

  try {
    printWindow.document.write(fullHtml);
    printWindow.document.close();
    printWindow.focus();

    // Wait for document load and styles to be applied
    await new Promise((resolve) => {
      printWindow.onload = () => {
        // Give extra time for highlight.js to process
        setTimeout(() => {
          resolve(undefined);
        }, 1000);
      };

      // Fallback if onload doesn't fire
      setTimeout(() => {
        resolve(undefined);
      }, 2000);
    });

    // Now trigger print
    printWindow.print();

    // Close window after printing
    setTimeout(() => {
      printWindow.close();
    }, 500);
  } catch (error) {
    console.error('Error during PDF conversion:', error);
    printWindow.close();
  }
};