import { IAction } from '@fullstackcraftllc/codevideo-types';
import { VirtualIDE } from '@fullstackcraftllc/codevideo-virtual-ide';
import pptxgen from 'pptxgenjs';
import { STYLES } from './STYLES';

/**
 * Creates a slide for editor content
 */
export const createCodeSlide = (
    pres: pptxgen, 
    action: IAction, 
    virtualIDE: VirtualIDE, 
    caption: string
  ) => {
    // Get the editor content after this action
    const editorSnapshot = virtualIDE.getEditorSnapshot();
    if (editorSnapshot.editors.length > 0) {
      const editorContent = editorSnapshot.editors[0].content;
      const editorFilename = editorSnapshot.editors[0].filename || "code.txt";
      
      // Create code slide
      let codeSlide = pres.addSlide();
      codeSlide.background = { color: 'FFFFFF' };
      
      // Add file name as header
      codeSlide.addText(editorFilename, { 
        x: 0.5, 
        y: 0.5, 
        w: '90%', 
        h: 0.5, 
        ...STYLES.normal,
        bold: true
      });
      
      // Add code content
      codeSlide.addText(editorContent, { 
        x: 0.5, 
        y: 1.2, 
        w: '90%', 
        h: 4, 
        ...STYLES.code
      });
      
      // Add caption if available
      if (caption) {
        codeSlide.addText(caption, { 
          x: 0.5, 
          y: 5.3, 
          w: '90%', 
          h: 0.8, 
          ...STYLES.caption
        });
      }
    }
  };