/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be exactly one column with the correct label
  const headerRow = ['Columns (columns1)'];

  // The second row must have as many columns as intended (here: 2)

  // Get the main child containing the columns
  const inner = element.children[0];
  if (!inner) return;

  // Prepare left column (number + heading)
  const leftCol = [];
  const numberDiv = inner.children[0];
  if (numberDiv) leftCol.push(numberDiv);
  let headingDiv = null;
  if (inner.children[1]) {
    // Find the heading textContents
    headingDiv = inner.children[1].querySelector('.textContents');
    if (headingDiv) leftCol.push(headingDiv);
  }

  // Prepare right column (description)
  let descriptionDiv = null;
  if (inner.children[2]) {
    descriptionDiv = inner.children[2].querySelector('.textContents');
  }
  const rightCol = [];
  if (descriptionDiv) rightCol.push(descriptionDiv);

  // Compose table
  const cells = [
    headerRow, // single column header row
    [leftCol, rightCol] // two columns for content row
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
