import { describe, expect, it } from "@jest/globals";
import { ICourse } from "@fullstackcraftllc/codevideo-types";
import { generateMarkdownStringFromCourse } from "../../../src/core/generateMarkdownStringFromCourse";

describe("generateMarkdownFromCourse", () => {
  describe("simple course", () => {
    it("should produce correct markdown output from a course", () => {
      const course: ICourse = {
        id: "hello-world-course",
        name: "Hello World Course",
        description: "This course has just one lesson, which is building a hello world example.",
        primaryLanguage: "javascript",
        lessons: [
          {
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
          }
        ]
      };

      const expectedMarkdown = 
        "# Hello World Course\n\n" +
        "This course has just one lesson, which is building a hello world example.\n\n" +
        "## Hello World\n\n" +
        "In this lesson, we're going to do a simple hello world example.\n\n" +
        "To showcase how codevideo works, we're just going to do a super basic hello world example here in src.\n\n" +
        "```javascript\nconsole.log('Hello World!');\n```\n\n" +
        "Nice, that looks pretty good! Pretty cool tool, right?!\n\n";

      const markdown = generateMarkdownStringFromCourse(course);
      expect(markdown).toBe(expectedMarkdown);
    });
  });
});