import { Project, ICourse, ILesson, ExportType } from "@fullstackcraftllc/codevideo-types";
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

// shape checks, not validity checks: a course or lesson with an unfinished or unknown action
// still exports, and callers that need a valid project check it with codevideo-types' validators
const isCourseShaped = (project: Project): project is ICourse =>
    typeof project === 'object' && project !== null && !Array.isArray(project) &&
    Array.isArray((project as ICourse).lessons) &&
    (project as ICourse).lessons.every((lesson) => Array.isArray(lesson?.actions));

const isLessonShaped = (project: Project): project is ILesson =>
    typeof project === 'object' && project !== null && !Array.isArray(project) &&
    Array.isArray((project as ILesson).actions);

/**
 * A dynamic function that exports a CodeVideo project to a specific format.
 * Can be called from a browser to generate exports in various formats.
 * Picks the generator by the project's shape (a course has lessons, a lesson has actions,
 * actions are an array), so a project with invalid actions still exports as-is.
 * Runs exactly one generator and rejects when the project or export type is not supported,
 * so callers can treat a resolved promise as a finished export.
 * @param project The project (type Project) to export (can be a course, lesson, or actions)
 * @param exportType The desired export format (type ExportFormat)
 * @returns Promise<void>
 */
export const exportProject = async (project: Project, exportType: ExportType): Promise<void> => {
    // all course exports
    if (isCourseShaped(project)) {
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
    if (isLessonShaped(project)) {
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
    if (Array.isArray(project)) {
        switch (exportType) {
            case 'markdown': return generateMarkdownFromActions(project);
            case 'html': return generateHtmlFromActions(project);
            case 'pdf': return generatePdfFromActions(project);
            case 'zip': return generateZipFromActions(project);
            case 'json': return generateJsonFromActions(project);
            case 'pptx': return generatePptxFromActions(project);
            case 'tsx': return generateTsxFromActions(project);
            case 'jsx': return generateJsxFromActions(project);
        }
        throw new Error(`exportProject: '${exportType}' export is not supported for actions`);
    }

    throw new Error('exportProject: project is not a course, lesson, or actions array');
}
