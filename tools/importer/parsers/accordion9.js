/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header row
  const headerRow = ['Accordion'];

  // This block's structure:
  // - 2 columns: left = label/title, right = content group
  // - 1 row (plus header): left = left block (label/title), right = stacked right content blocks

  // Find left and right columns
  // Get all immediate children
  const mainChildren = element.querySelectorAll(':scope > div');
  if (mainChildren.length < 2) return;

  const leftCol = mainChildren[0];
  const rightCol = mainChildren[1];

  // LEFT cell: collect all .textContents elements in leftCol (e.g. '1a' and 'Tone & Voice')
  const leftCellBlocks = Array.from(leftCol.querySelectorAll('.textContents'));
  // Use as an array so formatting/structure are preserved

  // RIGHT cell: collect all direct .css-5knerd descendants at depth 2 (each section)
  // Each section contains a title (css-auuzmq) and description (css-76di3q)
  const rightCellSections = [];
  const sectionDivs = rightCol.querySelectorAll(':scope > .css-5knerd');
  sectionDivs.forEach(sectionDiv => {
    // Reference the sectionDiv directly so formatting/structure are preserved
    rightCellSections.push(sectionDiv);
  });

  // Compose content row
  const contentRow = [
    leftCellBlocks,
    rightCellSections
  ];

  // Compose table
  const rows = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
