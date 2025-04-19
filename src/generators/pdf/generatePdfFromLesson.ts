import { ILesson } from "@fullstackcraftllc/codevideo-types";
import { generateMarkdownStringFromLesson } from "../../core/generateMarkdownStringFromLesson";
import { IGenerateMarkdownOptions } from "../../interfaces/IGenerateMarkdownOptions";
import { generatePdf } from "./generatePdf";

/**
 * Given a lesson, generates a PDF file based on various parameters.
 * @param lesson The lesson to generate PDF from.
 * @param options The options to use when generating markdown.
 */
export const generatePdfFromLesson = async (lesson: ILesson, options?: IGenerateMarkdownOptions) => {
    // generate markdown
    const markdown = generateMarkdownStringFromLesson(lesson, options);

    // generate pdf!
    await generatePdf(markdown);
}
