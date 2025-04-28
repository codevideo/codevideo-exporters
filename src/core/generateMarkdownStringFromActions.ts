import { IAction, isEditorAction } from "@fullstackcraftllc/codevideo-types";
import { VirtualIDE } from "@fullstackcraftllc/codevideo-virtual-ide";
import { IGenerateMarkdownOptions } from "../interfaces/IGenerateMarkdownOptions";
import { getFileExtension } from "../utils/getFileExtension";

/**
 * The core markdown generator for codevideo-doc-gen. 
 * Used by html and pdf generators, and of course the markdown generator itself.
 * @param actions 
 * @param options 
 * @returns The generated markdown
 */
export const generateMarkdownStringFromActions = (actions: IAction[], options?: IGenerateMarkdownOptions) => {
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
                // Only show terminal-type and terminal-set-output actions
                // Skip actions like terminal-open and terminal-enter which typically have a value of "1"
                if (action.name === 'terminal-type' || action.name === 'terminal-set-output') {
                    markdown += '```shell\n' + action.value + '\n```\n\n';
                }
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