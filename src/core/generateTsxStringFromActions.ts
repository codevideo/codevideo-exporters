import { IAction } from "@fullstackcraftllc/codevideo-types";

/**
 * Generates a string representing a TSX (TypeScript React) file from actions.
 * @param actions The actions to generate TSX from.
 * @returns A TSX string representing the actions.
 */
export const generateTsxStringFromActions = (actions: Array<IAction>): string => {
  const componentName = "ActionsTutorial";
  
  return `import React from 'react';
import { CodeVideoIDE } from '@fullstackcraftllc/codevideo-ide-react';

export const ${componentName} = ({
  theme = 'vs-dark',
  allowFocusInEditor = false,
  defaultLanguage = 'javascript',
  isSoundOn = false,
  withCaptions = true,
}) => {  
  // Course data
  const project = ${JSON.stringify(actions, null, 2)};
  
  return (
    <CodeVideoIDE
        theme={theme}
        project={project}
        mode="step"
        allowFocusInEditor={allowFocusInEditor}
        defaultLanguage={defaultLanguage}
        isExternalBrowserStepUrl={false}
        currentActionIndex={currentActionIndex}
        currentLessonIndex={index}
        isSoundOn={isSoundOn}
        withCaptions={withCaptions}
        actionFinishedCallback={goToNextAction}
        speakActionAudios={[]}
    />
  );
};`;
};