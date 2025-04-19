import { downloadBlob } from "../../utils/downloadBlob";

export async function generateJsonFromCourse(course: any): Promise<void> {
    const jsonString = JSON.stringify(course, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    downloadBlob(blob, 'codevideo-actions-export.json');
}
