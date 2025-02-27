import { ICourse } from "@fullstackcraftllc/codevideo-types";
import { IGenerateMarkdownOptions } from "./interfaces/IGenerateMarkdownOptions";
import { generateMarkdownFromCourse } from "./generateMarkdownFromCourse";
import { generateHtml } from "./generateHtml";

/**
 * Given a course, generates an HTML file based on various parameters.
 * @param course The course to generate HTML from.
 * @param options The options to use when generating markdown.
 */
export const generateHtmlFromCourse = async (course: ICourse, options?: IGenerateMarkdownOptions) => {
    // generate markdown
    const markdown = generateMarkdownFromCourse(course, options);

    // generate html!
    await generateHtml(markdown);
}
