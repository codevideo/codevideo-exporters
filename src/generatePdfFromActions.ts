import {
    IAction,
} from "@fullstackcraftllc/codevideo-types";
import { IGenerateMarkdownOptions } from "./interfaces/IGenerateMarkdownOptions";
import { generateMarkdownFromActions } from "./generateMarkdownFromActions";
import { generatePdf } from "./generatePdf";

/**
 * Given a list of actions, generates a PDF based on various parameters.
 * @param actions The list of actions to generate markdown from.
 * @param options The options to use when generating markdown.
 * @returns The markdown generated from the actions.
 */
export const generatePdfFromActions = async (actions: IAction[], options?: IGenerateMarkdownOptions) => {
    // generate markdown
    const markdown = generateMarkdownFromActions(actions);

    // generate pdf!
    await generatePdf(markdown);
}
