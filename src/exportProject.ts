import { Project, isCourse, isLesson, isValidActions, ExportType } from "@fullstackcraftllc/codevideo-types";
import { generateHtmlFromActions } from "./generators/html/generateHtmlFromActions";
import { generateHtmlFromCourse } from "./generators/html/generateHtmlFromCourse";
import { generateHtmlFromLesson } from "./generators/html/generateHtmlFromLesson";
import { generateJsonFromActions } from "./generators/json/generateJsonFromActions";
import { generateJsonFromCourse } from "./generators/json/generateJsonFromCourse";
import { generateJsonFromLesson } from "./generators/json/generateJsonFromLesson";
import { generateJsxFromActions } from "./generators/jsx/generateJsxFromActions";
import { generateJsxFromCourse } from "./generators/jsx/generateJsxFromCourse";
import { generateJsxFromLesson } from "./generators/jsx/generateJsxFromLesson";
import { generateMarkdownFromActions } from "./generators/markdown/generateMarkdownFromActions";
import { generateMarkdownFromCourse } from "./generators/markdown/generateMarkdownFromCourse";
import { generateMarkdownFromLesson } from "./generators/markdown/generateMarkdownFromLesson";
import { generatePdfFromActions } from "./generators/pdf/generatePdfFromActions";
import { generatePdfFromCourse } from "./generators/pdf/generatePdfFromCourse";
import { generatePdfFromLesson } from "./generators/pdf/generatePdfFromLesson";
import { generatePptxFromActions } from "./generators/pptx/generatePptxFromActions";
import { generatePptxFromCourse } from "./generators/pptx/generatePptxFromCourse";
import { generatePptxFromLesson } from "./generators/pptx/generatePptxFromLesson";
import { generateTsxFromActions } from "./generators/tsx/generateTsxFromActions";
import { generateTsxFromCourse } from "./generators/tsx/generateTsxFromCourse";
import { generateTsxFromLesson } from "./generators/tsx/generateTsxFromLesson";
import { generateZipFromActions } from "./generators/zip/generateZipFromActions";
import { generateZipFromCourse } from "./generators/zip/generateZipFromCourse";
import { generateZipFromLesson } from "./generators/zip/generateZipFromLesson";


/**
 * A dynamic function that exports a CodeVideo project to a specific format.
 * Can be called from a browser to generate exports in various formats.
 * @param project The project (type Project) to export (can be a course, lesson, or actions)
 * @param exportType The desired export format (type ExportFormat)
 * @returns Promise<void>
 */
export const exportProject = async (project: Project, exportType: ExportType): Promise<void> => {
    // all course exports
    if (isCourse(project) && exportType === 'markdown') {
        await generateMarkdownFromCourse(project);
    }
    if (isCourse(project) && exportType === 'html') {
        await generateHtmlFromCourse(project);
    }
    if (isCourse(project) && exportType === 'pdf') {
        await generatePdfFromCourse(project);
    }
    if (isCourse(project) && exportType === 'zip') {
        await generateZipFromCourse(project);
    }
    if (isCourse(project) && exportType === 'json') {
        await generateJsonFromCourse(project);
    }
    if (isCourse(project) && exportType === 'pptx') {
        await generatePptxFromCourse(project);
    }
    if (isCourse(project) && exportType === 'tsx') {
        await generateTsxFromCourse(project);
    }
    if (isCourse(project) && exportType === 'jsx') {
        await generateJsxFromCourse(project);
    }

    // all lesson exports
    if (isLesson(project) && exportType === 'markdown') {
        await generateMarkdownFromLesson(project);
    }
    if (isLesson(project) && exportType === 'html') {
        await generateHtmlFromLesson(project);
    }
    if (isLesson(project) && exportType === 'pdf') {
        await generatePdfFromLesson(project);
    }
    if (isLesson(project) && exportType === 'zip') {
        await generateZipFromLesson(project);
    }
    if (isLesson(project) && exportType === 'json') {
        await generateJsonFromLesson(project);
    }
    if (isLesson(project) && exportType === 'pptx') {
        await generatePptxFromLesson(project);
    }
    if (isLesson(project) && exportType === 'tsx') {
        await generateTsxFromLesson(project);
    }
    if (isLesson(project) && exportType === 'jsx') {
        await generateJsxFromLesson(project);
    }

    // all actions exports
    if (isValidActions(project) && exportType === 'markdown') {
        await generateMarkdownFromActions(project);
    }
    if (isValidActions(project) && exportType === 'html') {
        await generateHtmlFromActions(project);
    }
    if (isValidActions(project) && exportType === 'pdf') {
        await generatePdfFromActions(project);
    }
    if (isValidActions(project) && exportType === 'zip') {
        await generateZipFromActions(project);
    }
    if (isValidActions(project) && exportType === 'json') {
        await generateJsonFromActions(project);
    }
    if (isValidActions(project) && exportType === 'pptx') {
        await generatePptxFromActions(project);
    }
    if (isValidActions(project) && exportType === 'tsx') {
        await generateTsxFromActions(project);
    }
    if (isValidActions(project) && exportType === 'jsx') {
        await generateJsxFromActions(project);
    }
}
