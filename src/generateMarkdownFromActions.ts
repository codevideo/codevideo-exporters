import {
  IAction,
} from "@fullstackcraftllc/codevideo-types";
import { IGenerateMarkdownOptions } from "./interfaces/IGenerateMarkdownOptions";
import { generateMarkdownStringFromActions } from "./core/generateMarkdownStringFromActions";
import { generateMarkdown } from "./generateMarkdown";

/**
 * Given a list of actions, generates a markdown download.
 * @param actions The list of actions to generate markdown from.
 * @param options The options to use when generating markdown.
 */
export const generateMarkdownFromActions = async (actions: IAction[], options?: IGenerateMarkdownOptions) => {
  // generate markdown string
  const markdown = generateMarkdownStringFromActions(actions, options);

  // trigger markdown download!
  await generateMarkdown(markdown);
}