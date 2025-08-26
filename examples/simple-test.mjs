import { generatePptxFromActions } from '../dist/index.js';

console.log('🚀 Starting slide-display example...');

const actions = [
  {
    name: "slide-display",
    value: "# Hello World\n\nThis is a test slide!"
  }
];

console.log('📝 Actions defined:', actions);

try {
  console.log('⚡ Calling generatePptxFromActions...');
  const result = generatePptxFromActions(actions);
  console.log('✅ Success! Result type:', typeof result);
  console.log('📊 Result object keys:', Object.keys(result || {}));
  console.log('🎯 slide-display functionality is working!');
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('📚 Stack:', error.stack);
}
