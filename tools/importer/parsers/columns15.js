/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell with the exact string
  const headerRow = ['Columns (columns15)'];

  // The content row for columns15 is a two-column layout
  // Find the main wrapper inside the block
  const wrapper = element.querySelector(':scope > div');
  if (!wrapper) {
    // Defensive fallback: if there is no wrapper, put the content in one column
    const block = WebImporter.DOMUtils.createTable([
      headerRow,
      [element]
    ], document);
    element.replaceWith(block);
    return;
  }

  // Left column: number and heading/swatch
  // number: first .textContents
  const numberDiv = wrapper.querySelector(':scope > .textContents');
  // headingGroup: .css-hv01ud.css-5dba7r
  const headingGroup = wrapper.querySelector(':scope > .css-hv01ud.css-5dba7r');
  // Compose the left column with both, in order, as an array
  const leftCol = [];
  if (numberDiv) leftCol.push(numberDiv);
  if (headingGroup) leftCol.push(headingGroup);

  // Right column: the descriptive paragraphs
  const textDivs = wrapper.querySelectorAll(':scope > .textContents');
  let rightCol = null;
  if (textDivs.length > 1) {
    // The last .textContents div is the paragraph group
    rightCol = textDivs[textDivs.length - 1];
  } else if (textDivs.length === 1) {
    rightCol = textDivs[0];
  } else {
    rightCol = wrapper;
  }

  // Combine into a two-column content row
  const contentRow = [leftCol, rightCol];

  // Build the block table: header is a SINGLE CELL, content is two columns
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(block);
}
