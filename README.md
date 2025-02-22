# @fullstackcraftllc/codevideo-doc-gen

![NPM Version](https://img.shields.io/npm/v/@fullstackcraftllc/codevideo-doc-gen)

`codevideo-doc-gen` includes a series of TypeScript functions that can export a step by step software course into markdown, pdf, or html. This library is part of the [CodeVideo](https://codevideo.io) project.

This library heavily relies on the types from [@fullstackcraftllc/codevideo-types](https://github.com/codevideo/codevideo-types)

## Usage

Generate markdown from just an array of `IAction`s:

```typescript
import { generateMarkdownFromActions } from '@fullstackcraftllc/codevideo-doc-gen';
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
import { generateMarkdownFromLesson } from '@fullstackcraft/codevideo-doc-gen';
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
import { generateMarkdownFromCourse } from '@fullstackcraft/codevideo-doc-gen';
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