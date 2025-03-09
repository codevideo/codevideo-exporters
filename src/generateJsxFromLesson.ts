import { ILesson } from "@fullstackcraftllc/codevideo-types";
import { generateJsx } from "./generateJsx";
import { generateJsxStringFromLesson } from "./core/generateJsxStringFromLesson";

/**
 * Given a lesson, generates a JSX component download.
 * @param lesson The lesson to generate JSX from.
 */
export const generateJsxFromLesson = async (lesson: ILesson) => {
    // generate JSX string
    const jsxString = generateJsxStringFromLesson(lesson);
  
    // trigger JSX download!
    await generateJsx(jsxString, lesson.name);
  };