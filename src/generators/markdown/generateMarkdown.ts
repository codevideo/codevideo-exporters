export const generateMarkdown = async (markdown: string) => {
    // trigger download
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "codevideo-markdown-export.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
}