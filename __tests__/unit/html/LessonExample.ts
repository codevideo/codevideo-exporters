import { describe, expect, it } from "@jest/globals";
import { ILesson } from "@fullstackcraftllc/codevideo-types";
import { generateHtmlStringFromLesson } from "../../../src/core/generateHtmlStringFromLesson";

describe("generateHtmlStringFromLesson", () => {
  describe("simple lesson", () => {
    it("should override default background colors in the HTML", async () => {
      const lesson: ILesson = {
        id: "hello-world",
        name: "Hello World",
        description: "In this lesson, we're going to do a simple hello world example.",
        actions: [
          {
            name: "author-speak-before",
            value: "To showcase how codevideo works, we're just going to do a super basic hello world example here in src."
          },
          {
            name: "file-explorer-create-file",
            value: "src/hello-world.js"
          },
          {
            name: "file-explorer-open-file",
            value: "src/hello-world.js"
          },
          {
            name: "editor-type",
            value: "console.log('Hello World!');"
          },
          {
            name: "author-speak-before",
            value: "Nice, that looks pretty good! Pretty cool tool, right?!"
          }
        ]
      };

      const customBackground = "#FF0000"

      const html = await generateHtmlStringFromLesson(lesson, {}, { backgroundColor: customBackground });
      expect(html).toContain(`background: ${customBackground}`);
    });
  });
});