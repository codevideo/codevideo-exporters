import { ILesson } from "@fullstackcraftllc/codevideo-types";
import { convertMarkdownToHtml, IHtmlGeneratorOptions } from "../converters/convertMarkdownToHtml";
import { IGenerateMarkdownOptions } from "../interfaces/IGenerateMarkdownOptions";
import { generateMarkdownStringFromActions } from "./generateMarkdownStringFromActions";

export const generateHtmlStringFromLesson = async (lesson: ILesson, markdownOptions: Partial<IGenerateMarkdownOptions>, htmlOptions: Partial<IHtmlGeneratorOptions> = {}): Promise<string> => {
    // first convert lesson actions to markdown
    const markdown = generateMarkdownStringFromActions(lesson.actions, markdownOptions);

    // then convert markdown to HTML
    const html = await convertMarkdownToHtml(markdown, htmlOptions);

    return html;
}