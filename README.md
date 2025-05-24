# @fullstackcraftllc/codevideo-exporters

![NPM Version](https://img.shields.io/npm/v/@fullstackcraftllc/codevideo-exporters)

`codevideo-exporters` includes a series of browser-compatible TypeScript functions that can export a step by step software course into markdown, pdf, or html. This library is part of the [CodeVideo](https://codevideo.io) project.

This library heavily relies on the types from [@fullstackcraftllc/codevideo-types](https://github.com/codevideo/codevideo-types)

## Supported Export Formats
- **Markdown**: Export lessons and courses as markdown files, which can be used for blog posts or documentation.
- **PDF**: Export lessons and courses as PDF files, which can be used for printable documentation or e-books.
- **HTML**: Export lessons and courses as HTML files, which can be used for web pages or online documentation.
- **PPTX**: Export lessons and courses as PowerPoint presentations, which can be used for slideshows or presentations.
- **PNG**: Export lessons and courses as PNG images, which can be used for screenshots or image-based documentation.
- **ZIP**: Export the source code of all files and folders in a lesson or course as a ZIP file, which can be used for downloadable resources.

## Installation

```shell
npm install @fullstackcraftllc/codevideo-exporters
```

Install peer dependencies:

```shell
npm install highlight.js marked marked-highlight jszip html-to-png react-dom/server.browser
```
These dependencies are required for:
- `marked`: Markdown parsing
- `marked-highlight`: Markdown code block highlighting
- `highlight.js`: Code syntax highlighting (used with `marked-highlight`)
- `jszip`: For making .zip exports of files, also for the pngs .zip export
- `html-to-image`: For png exports
- `pptxgenjs`: For pptx exports


## Usage Example - Blog Post (Markdown Format)

Generate markdown from just an array of `IAction`s:

```typescript
import { generateMarkdownFromActions } from '@fullstackcraftllc/codevideo-exporters';
import { IAction } from '@fullstackcraftllc/codevideo-types';

const actions: Array<IAction> = [
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

const markdown = generateMarkdownFromActions(actions);
console.log(markdown);
// Output:
// To showcase how codevideo works, we're just going to do a super basic hello world example here in src.
//
// ```javascript
// console.log('Hello World!');
// ```
//
// Nice, that looks pretty good! Pretty cool tool, right?!
```

Generate markdown from an `ILesson`:

```typescript
import { generateMarkdownFromLesson } from '@fullstackcraft/codevideo-exporters';
import { ILesson } from '@fullstackcraft/codevideo-types';

const lesson: ILesson = {
  "title": "Hello World",
  "description": "In this lesson, we're going to do a simple hello world example.",
  "actions": [
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
}

const markdown = generateMarkdownFromLesson(lesson);
console.log(markdown);
// Output:
// # Hello World
//
// In this lesson, we're going to do a simple hello world example.
//
// To showcase how codevideo works, we're just going to do a super basic hello world example here in src.
//
// ```javascript
// console.log('Hello World!');
// ```
//
// Nice, that looks pretty good! Pretty cool tool, right?!
```

Generate markdown from an `ICourse`, which includes one or more `ILesson`s:

```typescript
import { generateMarkdownFromCourse } from '@fullstackcraft/codevideo-exporters';
import { ICourse } from '@fullstackcraft/codevideo-types';

const course: ICourse = {
  "title": "Hello World Course",
  "description": "This course has just one lesson, which is building a hello world example.",
  "lessons": [
    {
      "title": "Hello World",
      "description": "In this lesson, we're going to do a simple hello world example.",
      "actions": [
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
    }
  ]
}

const markdown = generateMarkdownFromCourse(course);
console.log(markdown);
// Output:
// # Hello World Course
//
// This course has just one lesson, which is building a hello world example.
//
// ## Hello World
//
// In this lesson, we're going to do a simple hello world example.
//
// To showcase how codevideo works, we're just going to do a super basic hello world example here in src.
//
// ```javascript
// console.log('Hello World!');
// ```
//
// Nice, that looks pretty good! Pretty cool tool, right?!
```

## Why?

Imagine you've defined all your steps of an awesome software course in a JSON file. You want to render this JSON file into a video, as a markdown blog post, or a sellable PDF. This is exactly what the CodeVideo library does. It takes in a JSON file and renders it into a video, markdown, or PDF.

See more at [codevideo.io](https://codevideo.io)