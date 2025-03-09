import { IAction } from "@fullstackcraftllc/codevideo-types";
import { generateJsx } from "./generateJsx";
import { generateJsxStringFromActions } from "./core/generateJsxStringFromActions";

/**
 * Given a list of actions, generates a JSX component download.
 * @param actions The list of actions to generate JSX from.
 */
export const generateJsxFromActions = async (actions: IAction[]) => {
    // generate JSX string
    const jsxString = generateJsxStringFromActions(actions);
  
    // trigger JSX download!
    await generateJsx(jsxString, "MyActionsLesson");
  };