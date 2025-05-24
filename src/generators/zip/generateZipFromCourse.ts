import { ICourse } from "@fullstackcraftllc/codevideo-types";
import JSZip from 'jszip';
import { convertMarkdownToHtml } from "../../converters/convertMarkdownToHtml";
import { generateMarkdownStringFromCourse } from "../../core/generateMarkdownStringFromCourse";
import { IGenerateMarkdownOptions } from "../../interfaces/IGenerateMarkdownOptions";

/**
 * Given a course, generates a ZIP file containing markdown, HTML, and PDF exports.
 * @param course The course to generate ZIP from.
 * @param options The options to use when generating content.
 */
export const generateZipFromCourse = async (course: ICourse, options?: IGenerateMarkdownOptions) => {
    const zip = new JSZip();
    
    // Generate markdown content
    const markdown = generateMarkdownStringFromCourse(course, options);
    
    // Add markdown to zip
    zip.file("course.md", markdown);
    
    // Generate HTML content
    const html = convertMarkdownToHtml(markdown, { title: course.name })
    
    zip.file("course.html", html);

    // Create the zip file
    const blob = await zip.generateAsync({ type: "blob" });
    
    // Trigger download
    const url = URL.createObjectURL(blob);
    try {
        const link = document.createElement('a');
        link.href = url;
        link.download = `${course.name.toLowerCase().replace(/\s+/g, '-')}-export.zip`;
        link.click();
    } finally {
        URL.revokeObjectURL(url);
    }
};
