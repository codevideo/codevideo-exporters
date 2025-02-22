import { generateMarkdownFromActions } from "../../src/generateMarkdownFromActions";
import { describe, expect, it } from "@jest/globals";
import { IAction } from "@fullstackcraftllc/codevideo-types";

describe("generateMarkdown", () => {
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

      const markdown = generateMarkdownFromActions(superSimpleActions);

      expect(markdown).toBe("To showcase how codevideo works, we're just going to do a super basic hello world example here in src.\n\n```javascript\nconsole.log('Hello World!');\n```\n\nNice, that looks pretty good! Pretty cool tool, right?!\n\n");
    });
  });
});