import htmlToImage from 'html-to-image';

/**
 * Converts a React DOM string of the CodeVideo IDE react component to a png; 
 * String should be generated via ReactDOMServer.renderToString(<CodeVideoIDE {...props} />);
 * @param reactDomRenderedString A string of the CodeVideoIDE
 */
export const generatePng = async (reactDomRenderedString: string): Promise<string> => {  
  // Create hidden container and set innerHTML to the reactDomRenderedString
  const container = document.createElement('div');
  container.innerHTML = reactDomRenderedString;
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  document.body.appendChild(container);
  
  // Convert to image
  const dataUrl = await htmlToImage.toPng(container)
  
  // cleanup
  document.body.removeChild(container);

  return dataUrl;
}