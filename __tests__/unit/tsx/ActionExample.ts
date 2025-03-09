import { describe, expect, it } from "@jest/globals";
import { IAction } from "@fullstackcraftllc/codevideo-types";
import { generateTsxStringFromActions } from "../../../src/core/generateTsxStringFromActions";

describe("generateTSX", () => {
  describe("simple actions", () => {
    it("should produce correct string output", () => {
      const superSimpleActions: Array<IAction> = [
        {
          "name": 'file-explorer-create-file',
          "value": 'src/hello-world.js'
        },
        {
          "name": 'file-explorer-open-file',
          "value": 'src/hello-world.js'
        },
        {
          "name": "author-speak-before",
          "value": "To showcase how codevideo works, we're just going to do a super basic hello world example here in src."
        },
        {
          "name": "editor-type",
          "value": "console.log('Hello World!');"
        },
        {
          "name": "author-speak-before",
          "value": "Nice, that looks pretty good! Pretty cool tool, right?!"
        }
      ]

      const markdown = generateTsxStringFromActions(superSimpleActions);

      expect(markdown).toBe(`import React from 'react';
import { CodeVideoIDE } from '@fullstackcraftllc/codevideo-ide-react';

export const ActionsTutorial = ({
  theme = 'vs-dark',
  allowFocusInEditor = false,
  defaultLanguage = 'javascript',
  isSoundOn = false,
  withCaptions = true,
}) => {  
  // Course data
  const project = [
  {
    "name": "file-explorer-create-file",
    "value": "src/hello-world.js"
  },
  {
    "name": "file-explorer-open-file",
    "value": "src/hello-world.js"
  },
  {
    "name": "author-speak-before",
    "value": "To showcase how codevideo works, we're just going to do a super basic hello world example here in src."
  },
  {
    "name": "editor-type",
    "value": "console.log('Hello World!');"
  },
  {
    "name": "author-speak-before",
    "value": "Nice, that looks pretty good! Pretty cool tool, right?!"
  }
];
  
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
};`);
    });
  });
});