import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

const defaultBackgroundColor = '#f6f8fa';

const baseStyles = `
body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1rem;
}

pre {
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 0.9em;
}

code {
    font-family: 'SF Mono', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    font-size: 0.9em;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    line-height: 1.25;
}
`;

const screenStyles = `
pre {
    background: #f6f8fa;
    border: 1px solid #e1e4e8;
}

.diff-highlight {
    background: #f6f8fa;
    border-radius: 4px;
    margin: 1rem 0;
}

.diff-highlight .token.deleted {
    background-color: #ffeef0;
    color: #b31d28;
}

.diff-highlight .token.inserted {
    background-color: #e6ffed;
    color: #22863a;
}

.diff-highlight .token.diff {
    color: #24292e;
}
`;

const printStyles = `
@media print {
    body {
      margin: 2.5cm;
      font-size: 11pt;
    }
  
    pre {
      background: none !important;
      border: 1px solid #ddd !important;
      page-break-inside: avoid;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  
    code {
      color: #000 !important;
    }
  
    .token.deleted {
      background: none !important;
      color: #b31d28 !important;
      text-decoration: line-through;
    }
    
    .token.inserted {
      background: none !important;
      color: #22863a !important;
    }
  
    h1, h2 {
      page-break-before: always;
    }
  
    h1, h2, h3, h4, h5, h6 {
      page-break-after: avoid;
    }
  
    a[href]::after {
      content: " (" attr(href) ")";
    }
  }
`;

export interface IHtmlGeneratorOptions {
  enableDiff?: boolean;
  isPdf?: boolean;
  title?: string;
  additionalStyles?: string;
  highlightTheme?: string;
  backgroundColor?: string;
  forReactHtml?: boolean; // For React HTML export compatibility
}

const defaultOptions: IHtmlGeneratorOptions = {
  enableDiff: true,
  isPdf: false,
  title: 'CodeVideo',
  additionalStyles: '',
  highlightTheme: 'github',
  backgroundColor: defaultBackgroundColor
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
  options: Partial<IHtmlGeneratorOptions> = {}
) => {
  const mergedOptions = { ...defaultOptions, ...options };
  const { isPdf, title, additionalStyles, highlightTheme, backgroundColor } = mergedOptions;

  const html = await marked.parse(markdownContent);

  let styleContent = `
    ${baseStyles}
    ${isPdf ? printStyles : screenStyles}
    ${additionalStyles}
  `;

  // if a background color which is NOT the default is provided, replace all occurrences of the default background color with the new one
  if (backgroundColor && backgroundColor !== defaultBackgroundColor) {
    styleContent = styleContent.replace(
      new RegExp(defaultBackgroundColor, 'g'),
      backgroundColor
    );
  }

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