import {
  ICourse,
} from "@fullstackcraftllc/codevideo-types";
import { generateMarkdownStringFromCourse } from "../../core/generateMarkdownStringFromCourse";
import { IGenerateMarkdownOptions } from "../../interfaces/IGenerateMarkdownOptions";
import { generateMarkdown } from "./generateMarkdown";

/**
 * Given a course, generates a markdown download.
 * @param actions The course to generate markdown from.
 * @param options The options to use when generating markdown.
 */
export const generateMarkdownFromCourse = async (course: ICourse, options?: IGenerateMarkdownOptions) => {
  // generate markdown string
  const markdown = generateMarkdownStringFromCourse(course, options);

  // trigger markdown download!
  await generateMarkdown(markdown);
}