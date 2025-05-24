import { IAction } from "@fullstackcraftllc/codevideo-types";
import { generateMarkdownStringFromActions } from "./generateMarkdownStringFromActions"
import { convertMarkdownToHtml } from "../converters/convertMarkdownToHtml";

export const generateHtmlStringFromActions = async (actions: IAction[]): Promise<string> => {
    // first convert actions to markdown
    const markdown = generateMarkdownStringFromActions(actions);

    // then convert markdown to HTML
    const html = await convertMarkdownToHtml(markdown);
    
    return html;
}