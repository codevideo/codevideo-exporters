import { ILesson } from "@fullstackcraftllc/codevideo-types";
import { generateTsx } from "./generateTsx";
import { generateTsxStringFromLesson } from "../../core/generateTsxStringFromLesson";

/**
 * Given a lesson, generates a TSX component download.
 * @param lesson The lesson to generate TSX from.
 */
export const generateTsxFromLesson = async (lesson: ILesson) => {
    // generate TSX string
    const tsxString = generateTsxStringFromLesson(lesson);
  
    // trigger TSX download!
    await generateTsx(tsxString, lesson.name);
  };