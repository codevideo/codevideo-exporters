// interfaces
export { IFileEntry } from './interfaces/IFileEntry'
export { IGenerateMarkdownOptions } from './interfaces/IGenerateMarkdownOptions'

// functions

// main dynamic function
export { exportProject } from './exportProject';

// markdown
export { generateMarkdownFromCourse } from './generateMarkdownFromCourse';
export { generateMarkdownFromLesson } from './generateMarkdownFromLesson';
export { generateMarkdownFromActions } from './generateMarkdownFromActions';

// html
export { generateHtmlFromCourse } from './generateHtmlFromCourse';
export { generateHtmlFromLesson } from './generateHtmlFromLesson';
export { generateHtmlFromActions } from './generateHtmlFromActions';

// pdf
export { generatePdfFromCourse } from './generatePdfFromCourse';
export { generatePdfFromLesson } from './generatePdfFromLesson';
export { generatePdfFromActions } from './generatePdfFromActions';

// zip
export { generateZipFromCourse } from './generateZipFromCourse';
export { generateZipFromLesson } from './generateZipFromLesson';
export { generateZipFromActions } from './generateZipFromActions';

// json
export { generateJsonFromCourse } from './generateJsonFromCourse';
export { generateJsonFromLesson } from './generateJsonFromLesson';
export { generateJsonFromActions } from './generateJsonFromActions';

// pptx
export { generatePptxFromCourse } from './generatePptxFromCourse';
export { generatePptxFromLesson } from './generatePptxFromLesson';
export { generatePptxFromActions } from './generatePptxFromActions';

// tsx
export { generateTsxFromCourse } from './generateTsxFromCourse';
export { generateTsxFromLesson } from './generateTsxFromLesson';
export { generateTsxFromActions } from './generateTsxFromActions';

// jsx
export { generateJsxFromCourse } from './generateJsxFromCourse';
export { generateJsxFromLesson } from './generateJsxFromLesson';
export { generateJsxFromActions } from './generateJsxFromActions';

// pngs - to keep dependencies of CodeVideoIDE out of this package, we use a different signature (array of snapshot string)
export { generatePngsFromActions } from './generatePngsFromActions';

// helper generators
export { generateHtml } from './generateHtml';
export { generatePdf } from './generatePdf';
export { generatePptx } from './generatePptx';
export { generateZip } from './generateZip';
export { generateJsx } from './generateJsx';
export { generateTsx } from './generateTsx';
