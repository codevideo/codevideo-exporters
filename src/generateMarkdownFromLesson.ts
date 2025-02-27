import {
  ILesson,
} from "@fullstackcraftllc/codevideo-types";
import { IGenerateMarkdownOptions } from "./interfaces/IGenerateMarkdownOptions";
import { generateMarkdown } from "./generateMarkdown";
import { generateMarkdownStringFromLesson } from "./core/generateMarkdownStringFromLesson";

/**
 * Given a lesson, generates a markdown download.
 * @param actions The lesson to generate markdown from.
 * @param options The options to use when generating markdown.
 */
export const generateMarkdownFromLesson = async (lesson: ILesson, options?: IGenerateMarkdownOptions) => {
  // generate markdown string
  const markdown = generateMarkdownStringFromLesson(lesson, options);

  // trigger markdown download!
  await generateMarkdown(markdown);
}