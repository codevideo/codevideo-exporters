import { ICourse } from "@fullstackcraftllc/codevideo-types";
import { generateJsxStringFromCourse } from "./core/generateJsxStringFromCourse";
import { generateJsx } from "./generateJsx";

/**
 * Given a course, generates a JSX component download.
 * @param course The course to generate JSX from.
 */
export const generateJsxFromCourse = async (course: ICourse) => {
    // generate JSX string
    const jsxString = generateJsxStringFromCourse(course);
  
    // trigger JSX download!
    await generateJsx(jsxString, course.name);
  };