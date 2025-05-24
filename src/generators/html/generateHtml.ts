import { convertMarkdownToHtml } from "../../converters/convertMarkdownToHtml";

export const generateHtml = async (markdown: string) => {
    const fullHtml = await convertMarkdownToHtml(markdown, {
      title: 'CodeVideo HTML Export'
    });
  
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
  
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = 'codevideo-html-export.html';
      link.click();
    } finally {
      URL.revokeObjectURL(url);
    }
  };
