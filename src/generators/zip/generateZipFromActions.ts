import {
  IAction,
  IFileEntry,
} from "@fullstackcraftllc/codevideo-types";
import { VirtualIDE } from "@fullstackcraftllc/codevideo-virtual-ide";
import { generateZip } from "./generateZip";

/**
 * Given a list of actions, generates a zip file containing all files created/modified during those actions.
 * @param actions The list of actions to generate the zip from.
 */
export const generateZipFromActions = async (actions: IAction[]) => {
  // Create virtual IDE instance
  const virtualIDE = new VirtualIDE();

  // Apply all actions to build up the file system
  for (const action of actions) {
    virtualIDE.applyAction(action);
  }

  // Get file system snapshot
  const filesAndContent = virtualIDE.virtualFileExplorer.getFullFilePathsAndContents();

  // Generate and download zip
  await generateZip(filesAndContent);
};