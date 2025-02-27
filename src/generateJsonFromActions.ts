import { downloadBlob } from './utils/downloadBlob';

export async function generateJsonFromActions(actions: any): Promise<void> {
    const jsonString = JSON.stringify(actions, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    downloadBlob(blob, 'codevideo-actions-export.json');
}