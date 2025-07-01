/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match the spec exactly
  const headerRow = ['Hero (hero7)'];

  // Background image row - none present, so blank
  const backgroundRow = [''];

  // Third row: All text content from this block, preserving order and hierarchy
  // Get all <p> from this section in visual order
  const paragraphs = element.querySelectorAll('p');
  const contentDiv = document.createElement('div');
  paragraphs.forEach((p) => {
    contentDiv.appendChild(p);
  });

  // Build the block table
  const cells = [
    headerRow,
    backgroundRow,
    [contentDiv]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
