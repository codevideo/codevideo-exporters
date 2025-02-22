/**
 * The options to use when generating markdown.
 */
export interface IGenerateMarkdownOptions {
    withLessonPrefix: boolean; // if true adds a "Lesson X: {name}" prefix to every lesson title
    strictlyStepByStep: boolean; // if true, editor actions are not collapsed into a single markdown block; every action is its own markdown block
}