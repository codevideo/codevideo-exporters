import pptxgen from 'pptxgenjs';
import { STYLES } from './utils/STYLES';
import { addActionSlides } from './utils/addActionSlides';
import { generatePptx } from './generatePptx';
import { IAction } from '@fullstackcraftllc/codevideo-types';

/**
 * Generates a PowerPoint presentation from a list of actions
 * @param actions The actions to convert to PowerPoint
 */
export const generatePptxFromActions = async (actions: IAction[]) => {
  const pptxContent = (pres: pptxgen) => {
    // Title Slide
    let titleSlide = pres.addSlide();
    titleSlide.background = { color: 'F5F5F5' };
    titleSlide.addText("CodeVideo Presentation", { 
      x: 0.5, 
      y: 2, 
      w: '90%', 
      h: 1.5, 
      align: 'center',
      ...STYLES.title
    });
    
    // Add action slides
    addActionSlides(pres, actions);
  };
  
  // Generate the PowerPoint and trigger download
  await generatePptx(pptxContent, 'codevideo-actions');
};