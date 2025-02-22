import { ICourse } from "@fullstackcraftllc/codevideo-types";
import { IGenerateMarkdownOptions } from "./interfaces/IGenerateMarkdownOptions";
import { generateMarkdownFromLesson } from "./generateMarkdownFromLesson";

export const generateMarkdownFromCourse = (course: ICourse, options?: IGenerateMarkdownOptions): string => {
    let markdown = '';
    // course name is level 1 header
    markdown += '# ' + course.name + '\n\n';
    markdown += course.description + '\n\n';
    for (const lesson of course.lessons) {
        markdown += generateMarkdownFromLesson(lesson, options);
    }
    return markdown;
}