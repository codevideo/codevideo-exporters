import { ILesson } from "@fullstackcraftllc/codevideo-types";
import { generateMarkdownFromActions } from "./generateMarkdownFromActions";
import { IGenerateMarkdownOptions } from "./interfaces/IGenerateMarkdownOptions";

export const generateMarkdownFromLesson = (lesson: ILesson, options?: IGenerateMarkdownOptions): string => {
    let markdown = '';
    // lesson title is level 2 header
    markdown += '## ' + lesson.name + '\n\n';
    markdown += lesson.description + '\n\n';
    markdown += generateMarkdownFromActions(lesson.actions, options);
    return markdown;
}