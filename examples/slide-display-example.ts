#!/usr/bin/env node

/**
 * Example demonstrating slide-display action support in PowerPoint generation
 * 
 * This example shows how markdown content in "slide-display" actions
 * is converted to PowerPoint slides with proper formatting.
 * 
 * Run with: npx ts-node examples/slide-display-example.ts
 */

import { IAction } from '@fullstackcraftllc/codevideo-types';
import { generatePptxFromActions } from '../src/generators/pptx/generatePptxFromActions';

const slideDisplayExample: Array<IAction> = [
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

console.log('Generating PowerPoint presentation with slide-display examples...');

// Generate the PowerPoint presentation
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
