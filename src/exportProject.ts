import { Project, isCourse, isLesson, isValidActions, ExportType } from "@fullstackcraftllc/codevideo-types";
import { generateHtmlFromActions } from "./generateHtmlFromActions";
import { generateMarkdownFromActions } from "./generateMarkdownFromActions";
import { generatePdfFromActions } from "./generatePdfFromActions";
import { generateZipFromActions } from "./generateZipFromActions";
import { generateHtmlFromCourse } from "./generateHtmlFromCourse";
import { generateHtmlFromLesson } from "./generateHtmlFromLesson";
import { generatePdfFromCourse } from "./generatePdfFromCourse";
import { generatePdfFromLesson } from "./generatePdfFromLesson";
import { generateZipFromCourse } from "./generateZipFromCourse";
import { generateZipFromLesson } from "./generateZipFromLesson";
import { generateJsonFromCourse } from "./generateJsonFromCourse";
import { generateJsonFromLesson } from "./generateJsonFromLesson";
import { generateJsonFromActions } from "./generateJsonFromActions";
import { generateMarkdownFromCourse } from "./generateMarkdownFromCourse";
import { generateMarkdownFromLesson } from "./generateMarkdownFromLesson";
import { generatePptxFromCourse } from "./generatePptxFromCourse";
import { generatePptxFromActions } from "./generatePptxFromActions";
import { generatePptxFromLesson } from "./generatePptxFromLesson";
import { generateTsxFromLesson } from "./generateTsxFromLesson";
import { generateJsxFromLesson } from "./generateJsxFromLesson";
import { generateTsxFromActions } from "./generateTsxFromActions";
import { generateJsxFromActions } from "./generateJsxFromActions";
import { generateTsxFromCourse } from "./generateTsxFromCourse";
import { generateJsxFromCourse } from "./generateJsxFromCourse";

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
