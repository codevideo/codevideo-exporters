import { Project, isCourse, isLesson, isActions, ExportType } from "@fullstackcraftllc/codevideo-types";
import { generateHtmlFromActions } from "./generateHtmlFromActions";
import { generateMarkdownFromActions } from "./generateMarkdownFromActions";
import { generateMarkdownFromCourse } from "./generateMarkdownFromCourse";
import { generateMarkdownFromLesson } from "./generateMarkdownFromLesson";
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

/**
 * A dynamic function that exports a project to a specific format.
 * Can be called from a browser to generate exports in various formats.
 * @param project The project to export (can be a course, lesson, or actions)
 * @param exportType The desired export format ('markdown', 'html', 'pdf', 'zip', or 'json')
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

    // all actions exports
    if (isActions(project) && exportType === 'markdown') {
        await generateMarkdownFromActions(project);
    }
    if (isActions(project) && exportType === 'html') {
        await generateHtmlFromActions(project);
    }
    if (isActions(project) && exportType === 'pdf') {
        await generatePdfFromActions(project);
    }
    if (isActions(project) && exportType === 'zip') {
        await generateZipFromActions(project);
    }
    if (isActions(project) && exportType === 'json') {
        await generateJsonFromActions(project);
    }
}
