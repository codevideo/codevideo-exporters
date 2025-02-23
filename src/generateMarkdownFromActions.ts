import {
  IAction,
  isEditorAction
} from "@fullstackcraftllc/codevideo-types";
import { VirtualIDE } from "@fullstackcraftllc/codevideo-virtual-ide";
import { getFileExtension } from "./utils/getFileExtension";
import { IGenerateMarkdownOptions } from "./interfaces/IGenerateMarkdownOptions";

/**
 * Given a list of actions, generates markdown based on various parameters.
 * @param actions The list of actions to generate markdown from.
 * @param options The options to use when generating markdown.
 * @returns The markdown generated from the actions.
 */
export const generateMarkdownFromActions = (actions: IAction[], options?: IGenerateMarkdownOptions): string => {
  const { strictlyStepByStep } = options || {
    strictlyStepByStep: false
  };
  // for each action, apply it to the virtual IDE and generate the corresponding markdown
  let currentActionIndex = 0;
  let markdown = '';
  const virtualIDE = new VirtualIDE();
  for (const action of actions) {
    // regardless of action, apply it
    virtualIDE.applyAction(action);

    // for strictlyStepByStep mode, always show the code snippet, regardless of how small the code change is
    if (strictlyStepByStep) {
      // get the full content of the current file
      const editorSnapshot = virtualIDE.getEditorSnapshot();
      const editorContent = editorSnapshot.editors[0].content;
      const editorFileExtension = editorSnapshot.editors[0].filename;
      const fileExtension = getFileExtension(editorFileExtension);
      const codeBlockName = getMarkdownCodeBlockNameFromFileExtension(fileExtension);
      markdown += '```' + codeBlockName + '\n' + editorContent + '\n```\n\n';

      currentActionIndex++;

      continue;
    }

    // otherwise, 
    switch (true) {
      case action.name.startsWith('author-'):
        markdown += `${action.value}\n\n`;
        break;
      case action.name.startsWith('file-explorer-'):
        // show the file tree
        // TODO: add to virtualIDE
        // const fileExplorerTree = virtualIDE.getFileExplorerTree();
        // markdown += '```\n' + fileExplorerTree + '\n```\n\n';

        // for now could use this - won't look too nice but it's better than nothing
        // const fileExplorerSnapshot = virtualIDE.getFileExplorerSnapshot();
        // markdown += '```\n' + JSON.stringify(fileExplorerSnapshot.fileStructure, null, 2) + '\n```\n\n';
        break;
      case action.name.startsWith('editor-'):
        // get the full content of the current file

        // since we are not in strictlyStepByStep mode, we only do this if the previous action is NOT an editor-type action
        const previousAction = currentActionIndex > 0 ? actions[currentActionIndex - 1] : null;
        if (previousAction && isEditorAction(previousAction)) {
          break;
        }

        const editorSnapshot = virtualIDE.getEditorSnapshot();
        const editorContent = editorSnapshot.editors[0].content;
        const editorFileExtension = editorSnapshot.editors[0].filename;
        const fileExtension = getFileExtension(editorFileExtension);
        const codeBlockName = getMarkdownCodeBlockNameFromFileExtension(fileExtension);
        markdown += '```' + codeBlockName + '\n' + editorContent + '\n```\n\n';
        break;
      case action.name.startsWith('terminal-'):
        markdown += '```shell\n' + action.value + '\n```\n\n';
        break;
    }

    currentActionIndex++;
  }

  return markdown;
}


const getMarkdownCodeBlockNameFromFileExtension = (fileExtension: string): string => {
  switch (fileExtension) {
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'js':
      return 'javascript';
    case 'ts':
      return 'typescript';
    case 'json':
      return 'json';
    case 'md':
      return 'markdown';
    case 'sh':
      return 'shell';
    case 'py':
      return 'python';
    case 'java':
      return 'java';
    case 'c':
      return 'c';
    case 'cpp':
      return 'cpp';
    case 'cs':
      return 'csharp';
    case 'rb':
      return 'ruby';
    case 'php':
      return 'php';
    case 'go':
      return 'go';
    case 'rs':
      return 'rust';
    case 'swift':
      return 'swift';
    case 'kt':
      return 'kotlin';
    case 'scala':
      return 'scala';
    case 'pl':
      return 'perl';
    case 'r':
      return 'r';
    case 'sql':
      return 'sql';
    case 'graphql':
      return 'graphql';
    case 'yaml':
      return 'yaml';
    case 'toml':
      return 'toml';
    case 'xml':
      return 'xml';
    case 'yml':
      return 'yaml';
    default:
      console.warn(`Unknown file extension: ${fileExtension}`);
      return '';
  }
}