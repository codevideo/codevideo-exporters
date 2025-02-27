import {
    IAction,
  } from "@fullstackcraftllc/codevideo-types";
  import { VirtualIDE } from "@fullstackcraftllc/codevideo-virtual-ide";
  import { generateZip } from "./generateZip";
import { IFileEntry } from "./interfaces/IFileEntry";
  
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
    const fsSnapshot = virtualIDE.getFileExplorerSnapshot();
    const files: Array<IFileEntry> = [];
  
    // Helper function to recursively process file structure
    const processFileStructure = (structure: any, currentPath: string = '') => {
      for (const [name, content] of Object.entries(structure)) {
        const path = currentPath ? `${currentPath}/${name}` : name;
        
        if (typeof content === 'string') {
          // It's a file
          files.push({
            path,
            content: content as string
          });
        } else {
          // It's a directory
          processFileStructure(content, path);
        }
      }
    };
  
    // Process the file structure
    processFileStructure(fsSnapshot.fileStructure);
  
    // Generate and download zip
    await generateZip(files);
  };