import { ICourse } from "@fullstackcraftllc/codevideo-types";
import { generatePptx } from "./generatePptx";
import { addActionSlides } from "./utils/addActionSlides";
import { STYLES } from "./utils/STYLES";
import pptxgen from 'pptxgenjs';

/**
 * Generates a PowerPoint presentation from a course
 * @param course The course to convert to PowerPoint
 */
export const generatePptxFromCourse = async (course: ICourse) => {
    const pptxContent = (pres: pptxgen) => {
      // Course Title Slide
      let titleSlide = pres.addSlide();
      titleSlide.background = { color: 'F5F5F5' };
      titleSlide.addText(course.name, { 
        x: 0.5, 
        y: 1.5, 
        w: '90%', 
        h: 1.5, 
        align: 'center',
        ...STYLES.title
      });
      titleSlide.addText(course.description, { 
        x: 0.5, 
        y: 3.5, 
        w: '80%', 
        h: 1.5, 
        align: 'center',
        ...STYLES.subtitle
      });
      
      // Process each lesson
      for (const lesson of course.lessons) {
        // Lesson Title Slide
        let lessonSlide = pres.addSlide();
        lessonSlide.background = { color: 'EDF2F7' };
        lessonSlide.addText(lesson.name, { 
          x: 0.5, 
          y: 2, 
          w: '90%', 
          h: 1, 
          align: 'center',
          ...STYLES.header
        });
        lessonSlide.addText(lesson.description, { 
          x: 0.5, 
          y: 3.5, 
          w: '80%', 
          h: 2, 
          align: 'center',
          ...STYLES.normal
        });
        
        // Add action slides
        addActionSlides(pres, lesson.actions);
      }
    };
    
    // Generate the PowerPoint and trigger download
    await generatePptx(pptxContent, `course-${course.name}`);
  };