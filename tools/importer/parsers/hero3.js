/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row matching the block name exactly as specified
  const headerRow = ['Hero (hero3)'];

  // Second row: Background image (optional)
  // Find the first <img> in the block
  let bgImg = element.querySelector('img');
  let row2 = bgImg ? [bgImg] : [''];

  // Third row: Title/subheading/paragraph (text content)
  // In this HTML, the text is in .textContents elements
  // We'll concatenate all textContents in order into a single cell
  const textContents = Array.from(element.querySelectorAll('[class*="textContents"]'));
  let row3;
  if (textContents.length > 0) {
    row3 = [textContents];
  } else {
    row3 = [''];
  }

  // Build the table rows array
  const cells = [
    headerRow,
    row2,
    row3
  ];

  // Create and replace with the new block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
