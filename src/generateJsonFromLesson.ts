import { downloadBlob } from "./utils/downloadBlob";

export async function generateJsonFromLesson(lesson: any): Promise<void> {
    const jsonString = JSON.stringify(lesson, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    downloadBlob(blob, 'codevideo-actions-export.json');
}
