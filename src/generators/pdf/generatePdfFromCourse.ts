import { ICourse } from "@fullstackcraftllc/codevideo-types";
import { generateMarkdownStringFromCourse } from "../../core/generateMarkdownStringFromCourse";
import { IGenerateMarkdownOptions } from "../../interfaces/IGenerateMarkdownOptions";
import { generatePdf } from "./generatePdf";

/**
 * Given a course, generates a PDF file based on various parameters.
 * @param course The course to generate PDF from.
 * @param options The options to use when generating markdown.
 */
export const generatePdfFromCourse = async (course: ICourse, options?: IGenerateMarkdownOptions) => {
    // generate markdown
    const markdown = generateMarkdownStringFromCourse(course, options);

    // generate pdf!
    await generatePdf(markdown);
}
