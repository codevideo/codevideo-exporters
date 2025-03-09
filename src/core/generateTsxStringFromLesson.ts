import { ILesson } from "@fullstackcraftllc/codevideo-types";
import { sanitizeComponentName } from "../utils/sanitizeComponentName";

/**
 * Generates a string representing a TSX (TypeScript React) file from a lesson.
 * @param lesson The lesson to generate TSX from.
 * @returns A TSX string representing the lesson.
 */
export const generateTsxStringFromLesson = (lesson: ILesson): string => {
  const componentName = sanitizeComponentName(lesson.name || "LessonTutorial");
  
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
  const project = ${JSON.stringify(lesson, null, 2)};
  
  return (
    <>
      <h1>{project.name}</h1>
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
    </>
  );
};`;
};