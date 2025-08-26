/**
 * Example demonstrating slide-display action support in PowerPoint generation
 * This version creates an actual .pptx file on disk
 */

import pptxgen from 'pptxgenjs';
import * as fs from 'fs';
import * as path from 'path';

// We'll recreate the basic functionality inline for this demo
const STYLES = {
    title: { fontSize: 36, bold: true, color: '363636' },
    subtitle: { fontSize: 20, color: '666666' },
    header: { fontSize: 28, bold: true, color: '363636' },
    normal: { fontSize: 16, color: '363636' },
    code: { fontSize: 14, fontFace: "Courier New", color: '363636' },
    caption: { fontSize: 14, italic: true, color: '666666' },
    progress: { fontSize: 10, color: '999999' }
};

const slideDisplayExample = [
  {
    "name": "slide-display",
    "value": "# CycloneDX Software Bill of Materials (SBOM) CLI Tool\n## Generate compliant SBOMs with ease!"
  },
  {
    "name": "slide-display",
    "value": "# Step 1\n\nAdd the following to your `.config/dotnet-tools.json`:\n\n```json\n   \"CycloneDX\": {\n      \"version\": \"5.4.0\",\n      \"commands\": [\n        \"dotnet-CycloneDX\"\n      ],\n      \"rollForward\": false\n    }\n```"
  },
  {
    "name": "slide-display",
    "value": "# Step 2\n\nIn your `.gitlab-ci.yml`, for example, call `dotnet tool restore` and call `dotnet CycloneDX`:\n\n```yml\n# Restore the CycloneDX tool\n- dotnet tool restore\n\n# Generate SBOM using CycloneDX JSON\n- dotnet CycloneDX -F Json \"${CI_PROJECT_DIR}/src/$projectName.sln\" \\\n -o sbom -fn \"${CI_PROJECT_DIR}/doc/cyclonedx/$projectName.json\"\n```"
  },
  {
    "name": "slide-display",
    "value": "# Step 3\n\nCycloneDX only creates the `author` field for each item in the SBOM, it will fail a perfect SBOM score in a tool like the [NTIA SBOM Validator](https://fossa.com/resources/devops-tools/ntia-sbom-validator/) because each item also needs a `supplier` field!*\n\nHowever, we can build a PowerShell script to copy all author fields to a supplier field that fullfills the requirements of the validator 😉 [check out the script here!](https://git.solve.ch/customers/compremium/ci-components/-/blob/main/scripts/create-supplier-sbom-entries.ps1?ref_type=heads) main logic section:\n\n```powershell\n# Set metadata.supplier to \"CycloneDX\"\n$json.metadata | Add-Member -NotePropertyName supplier -NotePropertyValue @{\n    name = \"CycloneDX\"\n} -Force\n\n# Create a component.supplier copy from component.author\nforeach ($component in $json.components) {\n    if (-not $component.supplier -and $component.authors.Count -gt 0) {\n        $component | Add-Member -NotePropertyName supplier -NotePropertyValue @{\n            name = $component.authors[0].name\n        } -Force\n    }\n}\n```\n\n\n\n\n\n\n\n\n<sub><sup>\n*See [this GitHub thread](https://github.com/CycloneDX/cyclonedx-dotnet/issues/770) for more details - summary: in the eyes of NTIA, the author field actually fulfills the requirements of a supplier (so NTIA has to actually update their validator, but whatever)\n</sup><sub>"
  },
  {
    "name": "slide-display",
    "value": "# Step 4\n\nRun the script after running the `CycloneDX` command!\n\n```yml\n# Update supplier names by copying author to supplier\n- .\\create-supplier-sbom-entries.ps1 \\\n  -InputFile \"MyProject/doc/cyclonedx/MySolution.json\" \\\n  -OutputFile \"MyProject/doc/cyclonedx/MySolution.json\"\n```\n\n(Probably better as one line in an actual `.gitlab-ci.yml` file; shown as multiline here just so it fits in the slide!)"
  },
  {
    "name": "slide-display",
    "value": "# Step 5\n\nEnjoy a perfect SBOM!"
  }
]

console.log('🚀 Creating PowerPoint presentation with slide-display examples...');
console.log('📊 Total actions:', slideDisplayExample.length);

try {
  // Create a new PowerPoint presentation
  const pres = new pptxgen();
  
  // Set layout
  pres.layout = 'LAYOUT_16x9';
  
  // Title Slide
  let titleSlide = pres.addSlide();
  titleSlide.background = { color: 'F5F5F5' };
  titleSlide.addText("CodeVideo Slide-Display Demo", { 
    x: 0.5, 
    y: 2, 
    w: '90%', 
    h: 1.5, 
    align: 'center',
    ...STYLES.title
  });
  
  // Add slides for each action
  for (const action of slideDisplayExample) {
    if (action.name === "author-speak-before") {
      // Create text slide
      let textSlide = pres.addSlide();
      textSlide.background = { color: 'F8F9FA' };
      
      textSlide.addText(action.value, { 
        x: 1, 
        y: 2, 
        w: '80%', 
        h: 2.5, 
        align: 'center',
        ...STYLES.normal
      });
    } else if (action.name === "slide-display") {
      // Create markdown slide
      let markdownSlide = pres.addSlide();
      markdownSlide.background = { color: 'FFFFFF' };
      
      // Simple markdown parsing - just handle the basic content for demo
      const lines = action.value.split('\n');
      let currentY = 0.5;
      const marginX = 0.5;
      const slideWidth = 9;
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine === '') continue;
        
        if (trimmedLine.startsWith('# ')) {
          // H1 - Title
          markdownSlide.addText(trimmedLine.substring(2), {
            x: marginX,
            y: currentY,
            w: slideWidth,
            h: 0.8,
            ...STYLES.title,
            align: 'center'
          });
          currentY += 1.2;
        } else if (trimmedLine.startsWith('## ')) {
          // H2 - Header
          markdownSlide.addText(trimmedLine.substring(3), {
            x: marginX,
            y: currentY,
            w: slideWidth,
            h: 0.8,
            ...STYLES.header,
            align: 'left'
          });
          currentY += 0.9;
        } else if (trimmedLine.startsWith('### ')) {
          // H3 - Subheader
          markdownSlide.addText(trimmedLine.substring(4), {
            x: marginX,
            y: currentY,
            w: slideWidth,
            h: 0.8,
            ...STYLES.subtitle,
            align: 'left'
          });
          currentY += 0.8;
        } else if (trimmedLine.startsWith('- ') || trimmedLine.match(/^\d+\. /)) {
          // List item
          const content = trimmedLine.startsWith('- ') ? '• ' + trimmedLine.substring(2) : trimmedLine;
          markdownSlide.addText(content, {
            x: marginX + 0.2,
            y: currentY,
            w: slideWidth - 0.2,
            h: 0.5,
            ...STYLES.normal,
            align: 'left'
          });
          currentY += 0.4;
        } else if (trimmedLine.startsWith('> ')) {
          // Blockquote
          markdownSlide.addText(trimmedLine.substring(2), {
            x: marginX + 0.5,
            y: currentY,
            w: slideWidth - 0.5,
            h: 0.8,
            ...STYLES.caption,
            italic: true,
            align: 'left'
          });
          currentY += 0.8;
        } else if (trimmedLine.startsWith('```')) {
          // Code block start - collect all code lines
          let codeContent = '';
          let i = lines.findIndex(l => l.trim() === trimmedLine) + 1;
          while (i < lines.length && !lines[i].trim().startsWith('```')) {
            codeContent += lines[i] + '\n';
            i++;
          }
          
          if (codeContent.trim()) {
            markdownSlide.addText(codeContent.trim(), {
              x: marginX,
              y: currentY,
              w: slideWidth,
              h: Math.max(1.0, codeContent.split('\n').length * 0.25 + 0.5),
              ...STYLES.code,
              align: 'left'
            });
            currentY += Math.max(1.0, codeContent.split('\n').length * 0.2 + 0.7);
          }
        } else if (!trimmedLine.startsWith('```') && trimmedLine.length > 0) {
          // Regular paragraph
          const cleanContent = trimmedLine
            .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
            .replace(/\*(.*?)\*/g, '$1')     // Italic
            .replace(/`(.*?)`/g, '$1');      // Inline code

          markdownSlide.addText(cleanContent, {
            x: marginX,
            y: currentY,
            w: slideWidth,
            h: 0.6,
            ...STYLES.normal,
            align: 'left'
          });
          currentY += 0.5;
        }
        
        // Break if we're getting too close to the bottom
        if (currentY > 6.5) break;
      }
    }
  }
  
  // Generate the file
  const outputPath = path.join(process.cwd(), 'slide-display-demo.pptx');
  
  console.log('💾 Writing PowerPoint file to:', outputPath);
  
  // Write the file
  await pres.writeFile({ fileName: outputPath });
  
  console.log('✅ PowerPoint presentation created successfully!');
  console.log('📝 File location:', outputPath);
  console.log('📋 File size:', fs.statSync(outputPath).size, 'bytes');
  console.log('');
  console.log('🎯 Key features demonstrated:');
  console.log('   ✓ Markdown parsing and conversion');
  console.log('   ✓ Code block formatting with monospace fonts');
  console.log('   ✓ Multiple slide generation');
  console.log('   ✓ Rich text formatting (headers, lists, quotes)');
  console.log('   ✓ Professional slide layouts');
  console.log('');
  console.log('🎊 Open the .pptx file to view your markdown-generated slides!');
  
} catch (error) {
  console.error('❌ Error generating presentation:', error.message);
  console.error('📚 Stack trace:', error.stack);
}
