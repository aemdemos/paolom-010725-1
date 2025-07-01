/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matching the example
  const headerRow = ['Columns (columns4)'];

  // There are two main columns in the screenshot:
  // Left: number and heading ("05 Typography")
  // Right: paragraphs, image, and more paragraphs

  // LEFT COLUMN (number and heading)
  // Find the two topmost .textContents blocks
  const textBlocks = element.querySelectorAll('.textContents');
  let leftColFragment = document.createDocumentFragment();
  if (textBlocks.length >= 2) {
    // Reference the actual elements from the DOM, do not clone
    leftColFragment.append(textBlocks[0], textBlocks[1]);
  } else if (textBlocks.length === 1) {
    leftColFragment.append(textBlocks[0]);
  }

  // RIGHT COLUMN (all the main content: description, image, font descriptions)
  // We'll use the parent of description paragraph, image, and font info
  // The structure is: .css-ga87j8 (contains intro paragraph), .css-v17kt0 (image), .css-nqrrdo (font info paragraphs)
  // All are inside the second .css-hv01ud.css-5dba7r
  let rightColFragment = document.createDocumentFragment();
  // Find the right content wrapper
  const rightSection = element.querySelectorAll('.css-hv01ud.css-5dba7r')[1];
  if (rightSection) {
    // Find intro paragraph
    const intro = rightSection.querySelector('.css-ga87j8 .textContents');
    if (intro) rightColFragment.append(intro);
    // Find the image
    const img = rightSection.querySelector('img');
    if (img) rightColFragment.append(img);
    // Find the font description (many paragraphs)
    const fontDesc = rightSection.querySelector('.css-nqrrdo');
    if (fontDesc) rightColFragment.append(fontDesc);
  } else {
    // fallback: try to find these elements anywhere
    const intro = element.querySelector('.css-ga87j8 .textContents');
    if (intro) rightColFragment.append(intro);
    const img = element.querySelector('img');
    if (img) rightColFragment.append(img);
    const fontDesc = element.querySelector('.css-nqrrdo');
    if (fontDesc) rightColFragment.append(fontDesc);
  }

  // Assemble the block table as in the example: header, then one row with 2 columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [leftColFragment, rightColFragment]
  ], document);

  element.replaceWith(table);
}
