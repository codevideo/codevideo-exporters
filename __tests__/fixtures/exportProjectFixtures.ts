import { IAction, ICourse, ILesson } from "@fullstackcraftllc/codevideo-types";

// one valid project of each type, for the exportProject tests

export const helloWorldActions: Array<IAction> = [
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
];

export const helloWorldLesson: ILesson = {
  id: "hello-world",
  name: "Hello World",
  description: "In this lesson, we're going to do a simple hello world example.",
  actions: helloWorldActions
};

export const helloWorldCourse: ICourse = {
  id: "hello-world-course",
  name: "Hello World Course",
  description: "A course with a single hello world lesson.",
  primaryLanguage: "javascript",
  lessons: [helloWorldLesson]
};
