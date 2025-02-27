import { ICourse } from "@fullstackcraftllc/codevideo-types";
import { generateMarkdownStringFromLesson } from "./generateMarkdownStringFromLesson";
import { IGenerateMarkdownOptions } from "../interfaces/IGenerateMarkdownOptions";

/**
 * 
 * @param course 
 * @param options 
 * @returns 
 */
export const generateMarkdownStringFromCourse = (course: ICourse, options?: IGenerateMarkdownOptions): string => {
    let markdown = '';
    // course name is level 1 header
    markdown += '# ' + course.name + '\n\n';
    markdown += course.description + '\n\n';
    for (const lesson of course.lessons) {
        markdown += generateMarkdownStringFromLesson(lesson, options);
    }
    return markdown;
}