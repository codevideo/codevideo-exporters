import { ILesson } from "@fullstackcraftllc/codevideo-types";
import JSZip from 'jszip';
import { generateMarkdownStringFromLesson } from "../../core/generateMarkdownStringFromLesson";
import { IGenerateMarkdownOptions } from "../../interfaces/IGenerateMarkdownOptions";
import { convertMarkdownToHtml } from "../../converters/convertMarkdownToHtml";

/**
 * Given a lesson, generates a ZIP file containing markdown, HTML, and PDF exports.
 * @param lesson The lesson to generate ZIP from.
 * @param options The options to use when generating content.
 */
export const generateZipFromLesson = async (lesson: ILesson, options?: IGenerateMarkdownOptions) => {
    const zip = new JSZip();
    
    // Generate markdown content
    const markdown = generateMarkdownStringFromLesson(lesson, options);
    
    // Add markdown to zip
    zip.file("lesson.md", markdown);
    
    // Generate HTML content
    const html = convertMarkdownToHtml(markdown, { title: lesson.name })
    zip.file("lesson.html", html);

    // Create the zip file
    const blob = await zip.generateAsync({ type: "blob" });
    
    // Trigger download
    const url = URL.createObjectURL(blob);
    try {
        const link = document.createElement('a');
        link.href = url;
        link.download = `${lesson.name.toLowerCase().replace(/\s+/g, '-')}-export.zip`;
        link.click();
    } finally {
        URL.revokeObjectURL(url);
    }
};
