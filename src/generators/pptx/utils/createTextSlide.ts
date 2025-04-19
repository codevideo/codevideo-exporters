import { IAction } from '@fullstackcraftllc/codevideo-types';
import pptxgen from 'pptxgenjs';
import { STYLES } from './STYLES';

/**
 * Creates a slide for author commentary
 */
export const createTextSlide = (
    pres: pptxgen, 
    action: IAction, 
    currentStep: number, 
    totalSteps: number
  ) => {
    // Create explanation slide
    let textSlide = pres.addSlide();
    textSlide.background = { color: 'F8F9FA' };
    
    // Add author commentary as main content
    textSlide.addText(action.value, { 
      x: 1, 
      y: 2, 
      w: '80%', 
      h: 2.5, 
      align: 'center',
      ...STYLES.normal
    });
    
    // Add slide number/progress indicator
    textSlide.addText(`Step ${currentStep} of ${totalSteps}`, { 
      x: 10, 
      y: 5.5, 
      w: 2, 
      h: 0.3, 
      align: 'right',
      ...STYLES.progress
    });
  };