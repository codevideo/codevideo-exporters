import { ILesson } from "@fullstackcraftllc/codevideo-types";
import { generateMarkdownStringFromLesson } from "../../core/generateMarkdownStringFromLesson";
import { IGenerateMarkdownOptions } from "../../interfaces/IGenerateMarkdownOptions";
import { generateHtml } from "./generateHtml";

/**
 * Given a lesson, generates an HTML file based on various parameters.
 * @param lesson The lesson to generate HTML from.
 * @param options The options to use when generating markdown.
 */
export const generateHtmlFromLesson = async (lesson: ILesson, options?: IGenerateMarkdownOptions) => {
    // generate markdown
    const markdown = generateMarkdownStringFromLesson(lesson, options);

    // generate html!
    await generateHtml(markdown);
}
