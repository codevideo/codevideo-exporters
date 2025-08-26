/**
 * Example demonstrating slide-display action support in PowerPoint generation
 * 
 * This example shows how markdown content in "slide-display" actions
 * is converted to PowerPoint slides with proper formatting.
 * 
 * Run with: node examples/slide-display-example.js
 */

import { generatePptxFromActions } from '../dist/index.js';

const slideDisplayExample = [
  {
    name: "author-speak-before",
    value: "Welcome to this presentation about CodeVideo's slide-display feature!"
  },
  {
    name: "slide-display",
    value: `# CodeVideo Slide Display Feature

## Overview

The **slide-display** action allows you to create presentation slides directly from markdown content.

### Key Features

- **Markdown Support**: Full markdown syntax including headers, lists, code blocks
- **Syntax Highlighting**: Code blocks are properly formatted with monospace fonts
- **Rich Formatting**: Support for bold, italic, and inline code
- **Multiple Elements**: Headers, paragraphs, lists, blockquotes, and code blocks

### Code Example

\`\`\`typescript
// TypeScript example with syntax highlighting
interface SlideConfig {
  title: string;
  content: string;
  theme?: 'light' | 'dark';
}

function createSlide(config) {
  console.log(\`Creating slide: \${config.title}\`);
}
\`\`\`

### Benefits

1. **Easy to Author**: Write slides in familiar markdown syntax
2. **Version Control Friendly**: Plain text format works great with git
3. **Consistent Styling**: Automated formatting ensures professional appearance
4. **Developer Focused**: Perfect for technical presentations and tutorials

> "slide-display makes it incredibly easy to create beautiful presentation slides from simple markdown content." - CodeVideo Team

## Getting Started

Simply add a \`slide-display\` action with your markdown content as the value!`
  },
  {
    name: "author-speak-before",
    value: "As you can see, the markdown content has been converted into a properly formatted PowerPoint slide with headings, code blocks, lists, and even blockquotes!"
  },
  {
    name: "slide-display",
    value: `# Multiple Slides Example

This demonstrates that you can have multiple slide-display actions in sequence.

## Slide Benefits

- Each slide-display action creates a new slide
- Content is automatically formatted
- Supports all standard markdown elements
- Maintains readable structure

### Technical Implementation

\`\`\`javascript
// JavaScript code example
function generateSlide(markdown) {
  const elements = parseMarkdown(markdown);
  return createPowerPointSlide(elements);
}
\`\`\`

Perfect for educational content and technical presentations!`
  },
  {
    name: "author-speak-before",
    value: "And here's another slide! You can chain multiple slide-display actions together to create comprehensive presentations."
  }
];

console.log('Generating PowerPoint presentation with slide-display examples...');

// Generate the PowerPoint presentation
try {
  const presentation = generatePptxFromActions(slideDisplayExample);
  
  console.log('✅ PowerPoint presentation generated successfully!');
  console.log('📝 The presentation includes:');
  console.log('   - Welcome slide with author commentary');
  console.log('   - Main slide with comprehensive markdown content');
  console.log('   - Secondary slide showing multiple slide capability');
  console.log('   - Proper formatting for headers, code, lists, and quotes');
  console.log('');
  console.log('🎯 Key features demonstrated:');
  console.log('   ✓ Markdown parsing and conversion');
  console.log('   ✓ Syntax highlighting for code blocks');
  console.log('   ✓ Multiple slide generation');
  console.log('   ✓ Rich text formatting');
  console.log('   ✓ Professional slide layouts');
  console.log('');
  console.log('💡 The presentation object is ready for download or further processing!');
} catch (error) {
  console.error('❌ Error generating presentation:', error.message);
  console.error('Stack trace:', error.stack);
}
