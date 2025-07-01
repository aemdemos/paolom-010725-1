/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content area with columns
  const mainContent = element.querySelector(':scope > div.css-4fug0b');
  if (!mainContent) return;

  // Collect the left column content: '5b' and 'Sizing'
  let leftColContent = null;
  const leftColWrapper = mainContent.querySelector(':scope > div.css-hv01ud');
  if (leftColWrapper) {
    const leftColInner = leftColWrapper.querySelector(':scope > div.css-ukfwp3');
    if (leftColInner) {
      const leftDiv = document.createElement('div');
      Array.from(leftColInner.children).forEach(child => leftDiv.appendChild(child));
      leftColContent = leftDiv;
    }
  }
  if (!leftColContent) leftColContent = document.createElement('div');

  // Collect the right column content (the paragraph)
  let rightColContent = null;
  const rightTextContents = Array.from(mainContent.children)
    .find(child => child.classList.contains('textContents'));
  if (rightTextContents) {
    rightColContent = rightTextContents;
  }
  if (!rightColContent) rightColContent = document.createElement('div');

  // The critical fix: The header row must always be a single column
  const cells = [
    ['Columns (columns10)'],
    [leftColContent, rightColContent],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
