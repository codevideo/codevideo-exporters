import { ILesson } from "@fullstackcraftllc/codevideo-types";
import { IGenerateMarkdownOptions } from "../interfaces/IGenerateMarkdownOptions";
import { generateMarkdownStringFromActions } from "./generateMarkdownStringFromActions";

/**
 * 
 * @param lesson 
 * @param options 
 * @returns 
 */
export const generateMarkdownStringFromLesson = (lesson: ILesson, options?: IGenerateMarkdownOptions): string => {
    let markdown = '';
    // lesson title is level 2 header
    markdown += '## ' + lesson.name + '\n\n';
    markdown += lesson.description + '\n\n';
    markdown += generateMarkdownStringFromActions(lesson.actions, options);
    return markdown;
}