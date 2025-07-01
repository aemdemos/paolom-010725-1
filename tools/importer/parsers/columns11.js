/* global WebImporter */
export default function parse(element, { document }) {
  // Find all the .css-hv01ud blocks which represent each card
  const cardEls = Array.from(element.querySelectorAll('.css-hv01ud'));

  // Group the cards into rows of two (since the screenshot shows a 2x2 grid)
  const rows = [];
  for (let i = 0; i < cardEls.length; i += 2) {
    rows.push(cardEls.slice(i, i + 2));
  }

  // Helper to extract image and text for a card
  function getCardContent(card) {
    const content = [];
    // Find image
    const img = card.querySelector('img');
    if (img) content.push(img);
    // Find all .textContents blocks (usually contains the two paragraphs)
    const textBlocks = Array.from(card.querySelectorAll('.textContents'));
    textBlocks.forEach(tb => {
      Array.from(tb.querySelectorAll('p')).forEach(p => content.push(p));
    });
    return content;
  }

  // The header row must be a single cell/column
  const header = ['Columns (columns11)'];

  // Build the content rows for the table (each content row must have the same number of columns as a row in the grid)
  const tableRows = rows.map(rowCards => rowCards.map(card => getCardContent(card)));

  // Assemble all as a single array: header row (one cell), then each content row (multiple cells)
  const tableData = [header, ...tableRows];

  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
