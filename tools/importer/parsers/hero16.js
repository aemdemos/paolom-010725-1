/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name, as required
  const headerRow = ['Hero (hero16)'];

  // Row 2: Background image (optional)
  // Find the first <img> inside element
  const img = element.querySelector('img');
  const bgImgCell = img || '';

  // Row 3: Title/subheading/cta (optional, not present in this HTML, so empty)
  const contentCell = '';

  // Assemble the table rows as specified: 1 column, 3 rows
  const rows = [
    headerRow,
    [bgImgCell],
    [contentCell],
  ];

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
