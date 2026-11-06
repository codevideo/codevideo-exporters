import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { ExportType, Project } from "@fullstackcraftllc/codevideo-types";
import { exportProject } from "../../../src/exportProject";
import { halfEditedActions, halfEditedCourse, halfEditedLesson, helloWorldActions, helloWorldCourse, helloWorldLesson } from "../../fixtures/exportProjectFixtures";

// Just enough of a browser for the real generators: every <a download> click counts as a
// downloaded file, and every print() of a window.open() popup counts as a PDF.
let files: Array<string> = [];
let isPopupBlocked = false;

const createAnchor = () => {
  const anchor: any = {
    dataset: {},
    setAttribute: () => {},
    click: () => files.push(anchor.download)
  };
  return anchor;
};

const openPrintWindow = () => {
  if (isPopupBlocked) {
    return null;
  }
  const printWindow: any = {
    document: { write: () => {}, close: () => {} },
    focus: () => {},
    print: () => files.push("print"),
    close: () => {}
  };
  // generatePdf waits for onload before printing, so fire it as soon as it is attached
  Object.defineProperty(printWindow, "onload", { set: (onload: () => void) => onload() });
  return printWindow;
};

// half-edited projects (an empty value and an unknown action name) must export as-is too
const projects: Array<[string, Project]> = [
  ["course", helloWorldCourse],
  ["lesson", helloWorldLesson],
  ["actions", helloWorldActions],
  ["half-edited course", halfEditedCourse],
  ["half-edited lesson", halfEditedLesson],
  ["half-edited actions", halfEditedActions]
];

const downloadFormats: Array<ExportType> = ["markdown", "html", "zip", "json", "pptx", "tsx", "jsx"];

describe("exportProject with the real generators", () => {
  beforeEach(() => {
    files = [];
    isPopupBlocked = false;
    (globalThis as any).document = {
      createElement: createAnchor,
      body: { appendChild: () => {}, removeChild: () => {} }
    };
    // a window global also sends pptxgenjs down its browser download path instead of writing to disk
    (globalThis as any).window = { open: openPrintWindow, URL };
  });

  describe.each(projects)("for a %s", (_, project) => {
    it.each(downloadFormats)("downloads exactly one %s file and resolves", async (format) => {
      await expect(exportProject(project, format)).resolves.toBeUndefined();
      expect(files).toHaveLength(1);
    });

    it("prints exactly one pdf and resolves", async () => {
      jest.useFakeTimers();
      try {
        const exported = exportProject(project, "pdf");
        await jest.runAllTimersAsync();
        await expect(exported).resolves.toBeUndefined();
        expect(files).toEqual(["print"]);
      } finally {
        jest.useRealTimers();
      }
    });

    it("rejects a pdf export when the print popup is blocked", async () => {
      isPopupBlocked = true;
      await expect(exportProject(project, "pdf")).rejects.toThrow("Failed to open print window");
      expect(files).toHaveLength(0);
    });
  });
});
