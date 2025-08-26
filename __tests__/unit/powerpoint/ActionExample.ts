import { describe, expect, it } from "@jest/globals";
import { IAction } from "@fullstackcraftllc/codevideo-types";
import { generatePptxFromActions } from "../../../src/generators/pptx/generatePptxFromActions";
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

  describe("slide-display actions", () => {
    it("should handle markdown slide-display actions", () => {
      const slideActions: Array<IAction> = [
        {
          "name": "slide-display",
          "value": `# Welcome to CodeVideo

## Introduction

This is a **sample presentation** with various markdown features:

### Code Example

\`\`\`javascript
function greet(name) {
  console.log('Hello, ' + name + '!');
}

greet('CodeVideo');
\`\`\`

### Key Features

- Easy to use
- Supports multiple formats
- Great for education
- *Completely awesome*

> This is a quote about how amazing CodeVideo is for creating educational content.

## Getting Started

1. Install the package
2. Create your actions
3. Export to PowerPoint
4. Share your content!

Thank you for using CodeVideo!`
        },
        {
          "name": "author-speak-before",
          "value": "This slide demonstrates how markdown content can be converted to PowerPoint slides."
        }
      ];

      // This should execute without throwing errors
      const result = generatePptxFromActions(slideActions);
      expect(result).toBeDefined();
    });
  });

  it("should produce a powerpoint for a really big action example", () => {
    generatePptxFromActions(advancedRustExampleActions);
  });
});