import { IFileEntry } from '@fullstackcraftllc/codevideo-types';
import JSZip from 'jszip';

export const generateZip = async (files: IFileEntry[]) => {
  const zip = new JSZip();

  // Add all files to the zip
  for (const file of files) {
    zip.file(file.path, file.content);
  }

  // Generate zip blob
  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: {
      level: 9
    }
  });

  // Create download link
  const url = URL.createObjectURL(blob);

  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'codevideo-export.zip';
    link.click();
  } finally {
    URL.revokeObjectURL(url);
  }
};