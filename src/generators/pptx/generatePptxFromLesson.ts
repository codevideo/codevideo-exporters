import { ILesson } from "@fullstackcraftllc/codevideo-types";
import { generatePptx } from "./generatePptx";
import { addActionSlides } from "./utils/addActionSlides";
import { STYLES } from "./utils/STYLES";
import pptxgen from 'pptxgenjs';

/**
 * Generates a PowerPoint presentation from a single lesson
 * @param lesson The lesson to convert to PowerPoint
 */
export const generatePptxFromLesson = async (lesson: ILesson) => {
    const pptxContent = (pres: pptxgen) => {
      // Lesson Title Slide
      let titleSlide = pres.addSlide();
      titleSlide.background = { color: 'F5F5F5' };
      titleSlide.addText(lesson.name, { 
        x: 0.5, 
        y: 1.5, 
        w: '90%', 
        h: 1.5, 
        align: 'center',
        ...STYLES.title
      });
      titleSlide.addText(lesson.description, { 
        x: 0.5, 
        y: 3.5, 
        w: '80%', 
        h: 1.5, 
        align: 'center',
        ...STYLES.subtitle
      });
      
      // Add action slides
      addActionSlides(pres, lesson.actions);
    };
    
    // Generate the PowerPoint and trigger download
    await generatePptx(pptxContent, `lesson-${lesson.name}`);
  };