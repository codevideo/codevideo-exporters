import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import baseStyles from './styles/base.css';
import screenStyles from './styles/screen.css';
import printStyles from './styles/print.css';

interface HtmlGeneratorOptions {
  enableDiff?: boolean;
  isPdf?: boolean;
  title?: string;
  additionalStyles?: string;
}

const defaultOptions: HtmlGeneratorOptions = {
  enableDiff: true,
  isPdf: false,
  title: 'CodeVideo',
  additionalStyles: ''
};

// Initialize marked with modern syntax highlighting
const marked = new Marked(
  markedHighlight({
    async: true,
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
      // if (!lang) return code;
      
      // // Special handling for diff + language combo (e.g., "typescript diff")
      // if (lang.includes('diff')) {
      //   const baseLang = lang.replace('diff', '').trim();
      //   // First highlight with the base language if it exists
      //   let highlighted = code;
      //   if (baseLang && hljs.getLanguage(baseLang)) {
      //     highlighted = hljs.highlight(code, { language: baseLang }).value;
      //   }
      //   // Then apply diff highlighting
      //   return hljs.highlight(highlighted, { language: 'diff' }).value;
      // }

      // // Regular language highlighting
      // try {
      //   return hljs.highlight(code, { language: lang }).value;
      // } catch (err) {
      //   console.warn(`Language ${lang} not found, using plaintext`);
      //   return hljs.highlight(code, { language: 'plaintext' }).value;
      // }
    }
  })
);

export const convertMarkdownToHtml = async (
  markdownContent: string,
  options: Partial<HtmlGeneratorOptions> = {}
) => {
  const mergedOptions = { ...defaultOptions, ...options };
  const { isPdf, title, additionalStyles } = mergedOptions;

  console.log(markdownContent);
  const html = await marked.parse(markdownContent);
  console.log(html)
  
  // TODO: make this configurable - needs to be lowercase filename 
  const highlightTheme = 'github'; 

  const styleContent = `
    ${baseStyles}
    ${isPdf ? printStyles : screenStyles}
    ${additionalStyles}
  `;

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${highlightTheme}.min.css">
      <style>${styleContent}</style>
    </head>
    <body>
      ${html}
    </body>
  </html>
  `;
};