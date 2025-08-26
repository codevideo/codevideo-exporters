import { IAction } from "@fullstackcraftllc/codevideo-types";
import { VirtualIDE } from "@fullstackcraftllc/codevideo-virtual-ide";
import pptxgen from 'pptxgenjs';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { STYLES } from './STYLES';

// Initialize marked with syntax highlighting
const marked = new Marked(
  markedHighlight({
    async: false,
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code: string, lang: string) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

marked.setOptions({
  gfm: true,
  breaks: false,
});

interface ParsedMarkdownElement {
  type: 'heading' | 'paragraph' | 'code' | 'list' | 'blockquote';
  content: string;
  level?: number; // for headings
  language?: string; // for code blocks
}

/**
 * Parse markdown content and extract structured elements
 */
const parseMarkdownForPPTX = (markdown: string): ParsedMarkdownElement[] => {
  const elements: ParsedMarkdownElement[] = [];
  const lines = markdown.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    
    if (line === '') {
      i++;
      continue;
    }

    // Handle headings
    if (line.startsWith('#')) {
      const level = line.match(/^#+/)?.[0].length || 1;
      const content = line.replace(/^#+\s*/, '');
      elements.push({
        type: 'heading',
        content,
        level
      });
      i++;
    }
    // Handle code blocks
    else if (line.startsWith('```')) {
      const language = line.substring(3).trim();
      let codeContent = '';
      i++; // Skip the opening ```
      
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeContent += lines[i] + '\n';
        i++;
      }
      
      if (i < lines.length) i++; // Skip the closing ```
      
      elements.push({
        type: 'code',
        content: codeContent.trim(),
        language
      });
    }
    // Handle blockquotes
    else if (line.startsWith('>')) {
      let blockquoteContent = line.substring(1).trim();
      i++;
      
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        blockquoteContent += '\n' + lines[i].substring(1).trim();
        i++;
      }
      
      elements.push({
        type: 'blockquote',
        content: blockquoteContent
      });
    }
    // Handle lists
    else if (line.match(/^[\*\-\+]\s/) || line.match(/^\d+\.\s/)) {
      let listContent = line;
      i++;
      
      while (i < lines.length && (lines[i].trim().match(/^[\*\-\+]\s/) || lines[i].trim().match(/^\d+\.\s/) || lines[i].trim().startsWith('  '))) {
        listContent += '\n' + lines[i];
        i++;
      }
      
      elements.push({
        type: 'list',
        content: listContent
      });
    }
    // Handle paragraphs
    else {
      let paragraphContent = line;
      i++;
      
      while (i < lines.length && lines[i].trim() !== '' && !lines[i].trim().match(/^[#>`\*\-\+]/) && !lines[i].trim().match(/^\d+\./) && !lines[i].trim().startsWith('```')) {
        paragraphContent += '\n' + lines[i];
        i++;
      }
      
      elements.push({
        type: 'paragraph',
        content: paragraphContent
      });
    }
  }

  return elements;
};

/**
 * Convert parsed markdown elements to pptxgen slides
 */
export const createSlideFromMarkdown = (
    pres: pptxgen, 
    action: IAction, 
    caption: string
  ) => {
    if (!action.value) return;

    const elements = parseMarkdownForPPTX(action.value);
    
    if (elements.length === 0) return;

    // Create the slide
    const slide = pres.addSlide();
    slide.background = { color: 'FFFFFF' };

    let currentY = 0.5;
    const marginX = 0.5;
    const slideWidth = 9; // Standard slide width minus margins
    const slideHeight = 7; // Standard slide height minus margins

    for (const element of elements) {
      switch (element.type) {
        case 'heading':
          const headingStyle = element.level === 1 ? STYLES.title : 
                              element.level === 2 ? STYLES.header : STYLES.subtitle;
          
          slide.addText(element.content, {
            x: marginX,
            y: currentY,
            w: slideWidth,
            h: 0.8,
            ...headingStyle,
            align: element.level === 1 ? 'center' : 'left'
          });
          currentY += element.level === 1 ? 1.2 : 0.9;
          break;

        case 'paragraph':
          // Remove basic markdown formatting for plain text
          const cleanContent = element.content
            .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
            .replace(/\*(.*?)\*/g, '$1')     // Italic
            .replace(/`(.*?)`/g, '$1')       // Inline code
            .replace(/\[(.*?)\]\(.*?\)/g, '$1'); // Links

          slide.addText(cleanContent, {
            x: marginX,
            y: currentY,
            w: slideWidth,
            h: 1.0,
            ...STYLES.normal,
            align: 'left'
          });
          currentY += 0.8;
          break;

        case 'code':
          // For code blocks, we'll add them as monospace text
          slide.addText(element.content, {
            x: marginX,
            y: currentY,
            w: slideWidth,
            h: Math.max(1.0, element.content.split('\n').length * 0.25 + 0.5),
            ...STYLES.code,
            align: 'left'
          });
          currentY += Math.max(1.0, element.content.split('\n').length * 0.2 + 0.5);
          break;

        case 'list':
          // Convert markdown list to plain text list
          const listItems = element.content.split('\n').filter(line => line.trim());
          const listText = listItems.map(item => {
            if (item.trim().match(/^[\*\-\+]\s/)) {
              return '• ' + item.trim().substring(2);
            } else if (item.trim().match(/^\d+\.\s/)) {
              return item.trim();
            } else if (item.trim().startsWith('  ')) {
              return '  ' + item.trim();
            }
            return item.trim();
          }).join('\n');

          slide.addText(listText, {
            x: marginX + 0.2,
            y: currentY,
            w: slideWidth - 0.2,
            h: Math.max(1.0, listItems.length * 0.3 + 0.3),
            ...STYLES.normal,
            align: 'left'
          });
          currentY += Math.max(0.8, listItems.length * 0.3 + 0.3);
          break;

        case 'blockquote':
          slide.addText(element.content, {
            x: marginX + 0.5,
            y: currentY,
            w: slideWidth - 0.5,
            h: 1.0,
            ...STYLES.caption,
            italic: true,
            align: 'left'
          });
          currentY += 0.8;
          break;
      }

      // Check if we need to create a new slide (basic overflow protection)
      if (currentY > slideHeight - 1) {
        break; // For now, just break. In a more advanced version, we could split content across slides
      }
    }

    // Add caption if available
    if (caption) {
      slide.addText(caption, {
        x: marginX,
        y: slideHeight,
        w: slideWidth,
        h: 0.5,
        ...STYLES.caption
      });
    }
  }