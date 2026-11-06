import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { ExportType, Project } from "@fullstackcraftllc/codevideo-types";
import { exportProject } from "../../../src/exportProject";
import { generateHtmlFromActions } from "../../../src/generators/html/generateHtmlFromActions";
import { generateHtmlFromCourse } from "../../../src/generators/html/generateHtmlFromCourse";
import { generateHtmlFromLesson } from "../../../src/generators/html/generateHtmlFromLesson";
import { generateJsonFromActions } from "../../../src/generators/json/generateJsonFromActions";
import { generateJsonFromCourse } from "../../../src/generators/json/generateJsonFromCourse";
import { generateJsonFromLesson } from "../../../src/generators/json/generateJsonFromLesson";
import { generateJsxFromActions } from "../../../src/generators/jsx/generateJsxFromActions";
import { generateJsxFromCourse } from "../../../src/generators/jsx/generateJsxFromCourse";
import { generateJsxFromLesson } from "../../../src/generators/jsx/generateJsxFromLesson";
import { generateMarkdownFromActions } from "../../../src/generators/markdown/generateMarkdownFromActions";
import { generateMarkdownFromCourse } from "../../../src/generators/markdown/generateMarkdownFromCourse";
import { generateMarkdownFromLesson } from "../../../src/generators/markdown/generateMarkdownFromLesson";
import { generatePdfFromActions } from "../../../src/generators/pdf/generatePdfFromActions";
import { generatePdfFromCourse } from "../../../src/generators/pdf/generatePdfFromCourse";
import { generatePdfFromLesson } from "../../../src/generators/pdf/generatePdfFromLesson";
import { generatePptxFromActions } from "../../../src/generators/pptx/generatePptxFromActions";
import { generatePptxFromCourse } from "../../../src/generators/pptx/generatePptxFromCourse";
import { generatePptxFromLesson } from "../../../src/generators/pptx/generatePptxFromLesson";
import { generateTsxFromActions } from "../../../src/generators/tsx/generateTsxFromActions";
import { generateTsxFromCourse } from "../../../src/generators/tsx/generateTsxFromCourse";
import { generateTsxFromLesson } from "../../../src/generators/tsx/generateTsxFromLesson";
import { generateZipFromActions } from "../../../src/generators/zip/generateZipFromActions";
import { generateZipFromCourse } from "../../../src/generators/zip/generateZipFromCourse";
import { generateZipFromLesson } from "../../../src/generators/zip/generateZipFromLesson";
import { helloWorldActions, helloWorldCourse, helloWorldLesson } from "../../fixtures/exportProjectFixtures";

jest.mock("../../../src/generators/html/generateHtmlFromActions");
jest.mock("../../../src/generators/html/generateHtmlFromCourse");
jest.mock("../../../src/generators/html/generateHtmlFromLesson");
jest.mock("../../../src/generators/json/generateJsonFromActions");
jest.mock("../../../src/generators/json/generateJsonFromCourse");
jest.mock("../../../src/generators/json/generateJsonFromLesson");
jest.mock("../../../src/generators/jsx/generateJsxFromActions");
jest.mock("../../../src/generators/jsx/generateJsxFromCourse");
jest.mock("../../../src/generators/jsx/generateJsxFromLesson");
jest.mock("../../../src/generators/markdown/generateMarkdownFromActions");
jest.mock("../../../src/generators/markdown/generateMarkdownFromCourse");
jest.mock("../../../src/generators/markdown/generateMarkdownFromLesson");
jest.mock("../../../src/generators/pdf/generatePdfFromActions");
jest.mock("../../../src/generators/pdf/generatePdfFromCourse");
jest.mock("../../../src/generators/pdf/generatePdfFromLesson");
jest.mock("../../../src/generators/pptx/generatePptxFromActions");
jest.mock("../../../src/generators/pptx/generatePptxFromCourse");
jest.mock("../../../src/generators/pptx/generatePptxFromLesson");
jest.mock("../../../src/generators/tsx/generateTsxFromActions");
jest.mock("../../../src/generators/tsx/generateTsxFromCourse");
jest.mock("../../../src/generators/tsx/generateTsxFromLesson");
jest.mock("../../../src/generators/zip/generateZipFromActions");
jest.mock("../../../src/generators/zip/generateZipFromCourse");
jest.mock("../../../src/generators/zip/generateZipFromLesson");

type ProjectType = "course" | "lesson" | "actions";

const projects: Record<ProjectType, Project> = {
  course: helloWorldCourse,
  lesson: helloWorldLesson,
  actions: helloWorldActions
};

// the one generator each project type and export format should run
const generators: Record<ProjectType, Partial<Record<ExportType, Function>>> = {
  course: {
    markdown: generateMarkdownFromCourse,
    html: generateHtmlFromCourse,
    pdf: generatePdfFromCourse,
    zip: generateZipFromCourse,
    json: generateJsonFromCourse,
    pptx: generatePptxFromCourse,
    tsx: generateTsxFromCourse,
    jsx: generateJsxFromCourse
  },
  lesson: {
    markdown: generateMarkdownFromLesson,
    html: generateHtmlFromLesson,
    pdf: generatePdfFromLesson,
    zip: generateZipFromLesson,
    json: generateJsonFromLesson,
    pptx: generatePptxFromLesson,
    tsx: generateTsxFromLesson,
    jsx: generateJsxFromLesson
  },
  actions: {
    markdown: generateMarkdownFromActions,
    html: generateHtmlFromActions,
    pdf: generatePdfFromActions,
    zip: generateZipFromActions,
    json: generateJsonFromActions,
    pptx: generatePptxFromActions,
    tsx: generateTsxFromActions,
    jsx: generateJsxFromActions
  }
};

const allGenerators = Object.values(generators).flatMap((byFormat) => Object.values(byFormat));

const cases = (Object.keys(generators) as Array<ProjectType>).flatMap((projectType) =>
  (Object.keys(generators[projectType]) as Array<ExportType>).map((format) => [projectType, format] as const)
);

const expectNoGeneratorCalls = () => {
  for (const generator of allGenerators) {
    expect(generator).not.toHaveBeenCalled();
  }
};

describe("exportProject", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each(cases)("runs only the %s %s generator, exactly once", async (projectType, format) => {
    const project = projects[projectType];
    const expected = generators[projectType][format];

    await expect(exportProject(project, format)).resolves.toBeUndefined();

    expect(expected).toHaveBeenCalledTimes(1);
    expect(expected).toHaveBeenCalledWith(project);
    for (const generator of allGenerators) {
      if (generator !== expected) {
        expect(generator).not.toHaveBeenCalled();
      }
    }
  });

  it.each([
    ["a lesson with an invalid action", { ...helloWorldLesson, actions: [{ name: "author-speak-before", value: "" }] }],
    ["an actions array with an unknown action", [{ name: "not-an-action", value: "hello" }]],
    ["an object that is no project at all", { name: "not a project" }]
  ])("rejects %s without running any generator", async (_, project) => {
    await expect(exportProject(project as Project, "json")).rejects.toThrow("not a valid course, lesson, or actions array");
    expectNoGeneratorCalls();
  });

  it.each(["mp4", "gif", "png"] as Array<ExportType>)("rejects the %s export type, which has no generator", async (format) => {
    await expect(exportProject(helloWorldLesson, format)).rejects.toThrow(`'${format}' export is not supported`);
    expectNoGeneratorCalls();
  });
});
