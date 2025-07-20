import { IAction } from "@fullstackcraftllc/codevideo-types";
import { generateMarkdownStringFromActions } from "./generateMarkdownStringFromActions"
import { convertMarkdownToHtml, IHtmlGeneratorOptions } from "../converters/convertMarkdownToHtml";
import { IGenerateMarkdownOptions } from "../interfaces/IGenerateMarkdownOptions";

export const generateHtmlStringFromActions = async (actions: IAction[], markdownOptions: Partial<IGenerateMarkdownOptions>, htmlOptions: Partial<IHtmlGeneratorOptions> = {}): Promise<string> => {
    // first convert actions to markdown
    const markdown = generateMarkdownStringFromActions(actions);

    // then convert markdown to HTML
    const html = await convertMarkdownToHtml(markdown, htmlOptions);
    
    return html;
}