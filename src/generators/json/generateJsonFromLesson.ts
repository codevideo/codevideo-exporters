import { downloadBlob } from "../../utils/downloadBlob";

/**
 * Triggers a download of a JSON file containing actions.
 * @param actions The actions to be exported as JSON.
 */
export async function generateJsonFromLesson(lesson: any): Promise<void> {
    const jsonString = JSON.stringify(lesson, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    downloadBlob(blob, 'codevideo-actions-export.json');
}
