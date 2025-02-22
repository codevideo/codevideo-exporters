import { generateMarkdownFromLesson } from "../../src/generateMarkdownFromLesson";
import { describe, expect, it } from "@jest/globals";
import { ILesson } from "@fullstackcraftllc/codevideo-types";

describe("generateMarkdownFromLesson", () => {
  describe("simple lesson", () => {
    it("should produce correct markdown output from a lesson", () => {
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

      const expectedMarkdown = 
        "## Hello World\n\n" +
        "In this lesson, we're going to do a simple hello world example.\n\n" +
        "To showcase how codevideo works, we're just going to do a super basic hello world example here in src.\n\n" +
        "```javascript\nconsole.log('Hello World!');\n```\n\n" +
        "Nice, that looks pretty good! Pretty cool tool, right?!\n\n";

      const markdown = generateMarkdownFromLesson(lesson);
      expect(markdown).toBe(expectedMarkdown);
    });
  });
});