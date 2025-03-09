import { ICourse } from "@fullstackcraftllc/codevideo-types";
import { generateTsxStringFromCourse } from "./core/generateTsxStringFromCourse";
import { generateTsx } from "./generateTsx";

/**
 * Given a course, generates a TSX component download.
 * @param course The course to generate TSX from.
 */
export const generateTsxFromCourse = async (course: ICourse) => {
    // generate TSX string
    const tsxString = generateTsxStringFromCourse(course);
  
    // trigger TSX download!
    await generateTsx(tsxString, course.name);
  };