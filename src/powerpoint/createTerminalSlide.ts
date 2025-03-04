import pptxgen from 'pptxgenjs';
import { IAction } from '@fullstackcraftllc/codevideo-types';
import { STYLES } from './STYLES';
/**
 * Creates a slide for terminal output
 */
export const createTerminalSlide = (
    pres: pptxgen, 
    action: IAction, 
    caption: string
  ) => {
    // Create terminal slide
    let terminalSlide = pres.addSlide();
    terminalSlide.background = { color: 'FFFFFF' };
    
    // Add a dark background for the terminal
    terminalSlide.addShape(pres.ShapeType.rect, { 
      x: 0.5, 
      y: 1, 
      w: '90%', 
      h: 4, 
      fill: { color: '212121' }
    });
    
    // Add terminal content
    terminalSlide.addText(action.value, { 
      x: 0.8, 
      y: 1.3, 
      w: '85%', 
      h: 3.5, 
      fontFace: "Courier New",
      fontSize: 14,
      color: 'FFFFFF'
    });
    
    // Add caption if available
    if (caption) {
      terminalSlide.addText(caption, { 
        x: 0.5, 
        y: 5.3, 
        w: '90%', 
        h: 0.8, 
        ...STYLES.caption
      });
    }
  };