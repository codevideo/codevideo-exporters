import { IAction } from "@fullstackcraftllc/codevideo-types";
import { generateTsx } from "./generateTsx";
import { generateTsxStringFromActions } from "../../core/generateTsxStringFromActions";

/**
 * Given a list of actions, generates a TSX component download.
 * @param actions The list of actions to generate TSX from.
 */
export const generateTsxFromActions = async (actions: IAction[]) => {
    // generate TSX string
    const tsxString = generateTsxStringFromActions(actions);
  
    // trigger TSX download!
    await generateTsx(tsxString, "MyActionsLesson");
  };