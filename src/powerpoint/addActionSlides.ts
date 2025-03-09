import { VirtualIDE } from '@fullstackcraftllc/codevideo-virtual-ide';
import pptxgen from 'pptxgenjs';
import { createTextSlide } from './createTextSlide';
import { createTerminalSlide } from './createTerminalSlide';
import { createCodeSlide } from './createCodeSlide';
import { IAction, isRepeatableAction } from '@fullstackcraftllc/codevideo-types';

/**
 * Helper function to add slides for each action
 * @param pres The PowerPoint presentation object
 * @param actions The list of actions to create slides for
 */
export const addActionSlides = (pres: pptxgen, actions: IAction[]) => {
    // Initialize virtual IDE to track actions and get captions
    const virtualIDE = new VirtualIDE();
    
    // Each action becomes a single slide
    let actionCount = 0;
    for (const action of actions) {
      // Apply the action to the virtualIDE
      virtualIDE.applyAction(action);
      actionCount++;
      
      // Get author caption if available
      const authorSnapshot = virtualIDE.getAuthorSnapshot();
      const caption = authorSnapshot.authors.length > 0 ? 
        authorSnapshot.authors[0].currentSpeechCaption : "";
      
      // Process each action type
      if (action.name.startsWith("editor-") && !isRepeatableAction(action)) {
        createCodeSlide(pres, action, virtualIDE, caption);
      } else if (action.name.startsWith("author-speak-")) {
        createTextSlide(pres, action, actionCount, actions.length);
      } else if (action.name.startsWith("terminal-") && !isRepeatableAction(action)) {
        createTerminalSlide(pres, action, caption);
      }
    }
  };
  