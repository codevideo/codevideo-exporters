import {
    IAction,
} from "@fullstackcraftllc/codevideo-types";
import { IGenerateMarkdownOptions } from "./interfaces/IGenerateMarkdownOptions";
import { generateMarkdownFromActions } from "./generateMarkdownFromActions";
import { generateHtml } from "./generateHtml";

/**
 * Given a list of actions, generates an HTML file based on various parameters.
 * @param actions The list of actions to generate markdown from.
 * @param options The options to use when generating markdown.
 * @returns The markdown generated from the actions.
 */
export const generateHtmlFromActions = async (actions: IAction[], options?: IGenerateMarkdownOptions) => {
    // generate markdown
    const markdown = generateMarkdownFromActions(actions);

    // generate html!
    await generateHtml(markdown);
}
