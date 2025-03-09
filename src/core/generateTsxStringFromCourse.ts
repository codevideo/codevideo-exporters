import { ICourse } from "@fullstackcraftllc/codevideo-types";
import { sanitizeComponentName } from "../utils/sanitizeComponentName";

/**
 * Generates a string representing a TSX (TypeScript React) file from a course.
 * @param course The course to generate TSX from.
 * @returns A TSX string representing the course.
 */
export const generateTsxStringFromCourse = (course: ICourse): string => {
  const componentName = sanitizeComponentName(course.name || "CourseTutorial");
  
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
  const project = ${JSON.stringify(course, null, 2)};
  
  return (
    <>
      <h1>{project.name}</h1>
        {project.lessons.map((lesson, index) => (
            <>
                <h2>Lesson: {project.lessons[index].name}</h2>
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
        )}
    </>
  );
};`;
};