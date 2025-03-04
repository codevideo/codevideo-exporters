import { describe, expect, it } from "@jest/globals";
import { IAction } from "@fullstackcraftllc/codevideo-types";
import { generatePptxFromActions } from "../../../src/generatePptxFromActions";
import { advancedRustExampleActions } from "../../fixtures/rustAdvancedExample";

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

      generatePptxFromActions(superSimpleActions);

    });
  });
  it("should produce a powerpoint for a really big action example", () => {
    generatePptxFromActions(advancedRustExampleActions);
  });
});