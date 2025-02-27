import { ILesson } from "@fullstackcraftllc/codevideo-types";
import { IGenerateMarkdownOptions } from "./interfaces/IGenerateMarkdownOptions";
import { generateMarkdownFromLesson } from "./generateMarkdownFromLesson";
import { generateHtml } from "./generateHtml";

/**
 * Given a lesson, generates an HTML file based on various parameters.
 * @param lesson The lesson to generate HTML from.
 * @param options The options to use when generating markdown.
 */
export const generateHtmlFromLesson = async (lesson: ILesson, options?: IGenerateMarkdownOptions) => {
    // generate markdown
    const markdown = generateMarkdownFromLesson(lesson, options);

    // generate html!
    await generateHtml(markdown);
}
