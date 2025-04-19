import {
    IAction,
} from "@fullstackcraftllc/codevideo-types";
import { generateMarkdownStringFromActions } from "../../core/generateMarkdownStringFromActions";
import { generatePdf } from "./generatePdf";
import { IGenerateMarkdownOptions } from "../../interfaces/IGenerateMarkdownOptions";

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
