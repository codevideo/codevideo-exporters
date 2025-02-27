import {
    IAction,
} from "@fullstackcraftllc/codevideo-types";
import { IGenerateMarkdownOptions } from "./interfaces/IGenerateMarkdownOptions";
import { generateMarkdownFromActions } from "./generateMarkdownFromActions";
import { generatePdf } from "./generatePdf";
import { generateMarkdown } from "./generateMarkdown";
import { generateMarkdownStringFromActions } from "./core/generateMarkdownStringFromActions";

/**
 * Given a list of actions, triggers a PDF download based on various parameters.
 * @param actions The list of actions to generate markdown from.
 * @param options The options to use when generating markdown.
 */
export const generatePdfFromActions = async (actions: IAction[], options?: IGenerateMarkdownOptions) => {
    // generate markdown
    const markdown = generateMarkdownStringFromActions(actions);

    // generate pdf!
    await generatePdf(markdown);
}
