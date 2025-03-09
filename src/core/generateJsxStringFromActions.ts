import { IAction } from "@fullstackcraftllc/codevideo-types";

/**
 * Generates a string representing a JSX (React) file from actions.
 * @param actions The actions to generate JSX from.
 * @returns A JSX string representing the actions.
 */
export const generateJsxStringFromActions = (actions: Array<IAction>): string => {
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