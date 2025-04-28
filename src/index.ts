// interfaces
export { IGenerateMarkdownOptions } from './interfaces/IGenerateMarkdownOptions'

// functions

// main dynamic function
export { exportProject } from './exportProject';

// markdown
export { generateMarkdownFromCourse } from './generators/markdown/generateMarkdownFromCourse';
export { generateMarkdownFromLesson } from './generators/markdown/generateMarkdownFromLesson';
export { generateMarkdownFromActions } from './generators/markdown/generateMarkdownFromActions';
export { generateMarkdownStringFromActions } from './core/generateMarkdownStringFromActions';

// html
export { generateHtmlFromCourse } from './generators/html/generateHtmlFromCourse';
export { generateHtmlFromLesson } from './generators/html/generateHtmlFromLesson';
export { generateHtmlFromActions } from './generators/html/generateHtmlFromActions';

// pdf
export { generatePdfFromCourse } from './generators/pdf/generatePdfFromCourse';
export { generatePdfFromLesson } from './generators/pdf/generatePdfFromLesson';
export { generatePdfFromActions } from './generators/pdf/generatePdfFromActions';

// zip
export { generateZipFromCourse } from './generators/zip/generateZipFromCourse';
export { generateZipFromLesson } from './generators/zip/generateZipFromLesson';
export { generateZipFromActions } from './generators/zip/generateZipFromActions';

// json
export { generateJsonFromCourse } from './generators/json/generateJsonFromCourse';
export { generateJsonFromLesson } from './generators/json/generateJsonFromLesson';
export { generateJsonFromActions } from './generators/json/generateJsonFromActions';

// pptx
export { generatePptxFromCourse } from './generators/pptx/generatePptxFromCourse';
export { generatePptxFromLesson } from './generators/pptx/generatePptxFromLesson';
export { generatePptxFromActions } from './generators/pptx/generatePptxFromActions';

// tsx
export { generateTsxFromCourse } from './generators/tsx/generateTsxFromCourse';
export { generateTsxFromLesson } from './generators/tsx/generateTsxFromLesson';
export { generateTsxFromActions } from './generators/tsx/generateTsxFromActions';
export { generateTsxStringFromActions } from './core/generateTsxStringFromActions';

// jsx
export { generateJsxFromCourse } from './generators/jsx/generateJsxFromCourse';
export { generateJsxFromLesson } from './generators/jsx/generateJsxFromLesson';
export { generateJsxFromActions } from './generators/jsx/generateJsxFromActions';
export { generateJsxStringFromActions } from './core/generateJsxStringFromActions';

// pngs - to keep dependencies of CodeVideoIDE out of this package, we use a different signature (array of snapshot string)
export { generatePngsFromActions } from './generators/png/generatePngsFromActions';

// Component-specific PNG exporters - for example a png of the file explorer, editor, terminal, etc.
export { exportComponentPng } from './generators/png/exportComponentPng';
export { exportFileExplorerPng } from './generators/png/exportComponentPng';
export { exportEditorPng } from './generators/png/exportComponentPng';
export { exportTerminalPng } from './generators/png/exportComponentPng';
export { exportEditorAreaPng } from './generators/png/exportComponentPng';

// helper generators to trigger browser downloads
export { generateMarkdown } from './generators/markdown/generateMarkdown';
export { generateHtml } from './generators/html/generateHtml';
export { generatePdf } from './generators/pdf/generatePdf';
export { generatePptx } from './generators/pptx/generatePptx';
export { generateZip } from './generators/zip/generateZip';
export { generateJsx } from './generators/jsx/generateJsx';
export { generateTsx } from './generators/tsx/generateTsx';
