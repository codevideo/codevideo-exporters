import { Project, IAction, isCourse, isLesson, isValidActions, ExportType } from "@fullstackcraftllc/codevideo-types";
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
 * Runs exactly one generator and rejects when the project or export type is not supported,
 * so callers can treat a resolved promise as a finished export.
 * @param project The project (type Project) to export (can be a course, lesson, or actions)
 * @param exportType The desired export format (type ExportFormat)
 * @returns Promise<void>
 */
export const exportProject = async (project: Project, exportType: ExportType): Promise<void> => {
    // all course exports
    if (isCourse(project)) {
        switch (exportType) {
            case 'markdown': return generateMarkdownFromCourse(project);
            case 'html': return generateHtmlFromCourse(project);
            case 'pdf': return generatePdfFromCourse(project);
            case 'zip': return generateZipFromCourse(project);
            case 'json': return generateJsonFromCourse(project);
            case 'pptx': return generatePptxFromCourse(project);
            case 'tsx': return generateTsxFromCourse(project);
            case 'jsx': return generateJsxFromCourse(project);
        }
        throw new Error(`exportProject: '${exportType}' export is not supported for a course`);
    }

    // all lesson exports
    if (isLesson(project)) {
        switch (exportType) {
            case 'markdown': return generateMarkdownFromLesson(project);
            case 'html': return generateHtmlFromLesson(project);
            case 'pdf': return generatePdfFromLesson(project);
            case 'zip': return generateZipFromLesson(project);
            case 'json': return generateJsonFromLesson(project);
            case 'pptx': return generatePptxFromLesson(project);
            case 'tsx': return generateTsxFromLesson(project);
            case 'jsx': return generateJsxFromLesson(project);
        }
        throw new Error(`exportProject: '${exportType}' export is not supported for a lesson`);
    }

    // all actions exports
    // isValidActions returns an { isValid, errors } object (codevideo-types >= 2.1.32), so the result itself is always truthy
    if (isValidActions(project).isValid) {
        const actions = project as Array<IAction>;
        switch (exportType) {
            case 'markdown': return generateMarkdownFromActions(actions);
            case 'html': return generateHtmlFromActions(actions);
            case 'pdf': return generatePdfFromActions(actions);
            case 'zip': return generateZipFromActions(actions);
            case 'json': return generateJsonFromActions(actions);
            case 'pptx': return generatePptxFromActions(actions);
            case 'tsx': return generateTsxFromActions(actions);
            case 'jsx': return generateJsxFromActions(actions);
        }
        throw new Error(`exportProject: '${exportType}' export is not supported for actions`);
    }

    throw new Error('exportProject: project is not a valid course, lesson, or actions array');
}
