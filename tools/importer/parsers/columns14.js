/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the left column: looks for the first text contents ("Contents")
  function findLeftCol(el) {
    // Look for a p with text 'Contents'
    const p = el.querySelector('p');
    if (p && p.textContent.trim() === 'Contents') {
      // Return the closest parent that contains just this text (the .textContents container)
      return p.closest('.textContents') || p.parentElement;
    }
    // Fallback: just use the first child
    return el.firstElementChild;
  }

  // Helper to find the right column (the list of 01 Brand Strategy, 02 Personality, ...)
  function findRightCol(el) {
    // The right column is a container with all the number+label pairs
    // Traverse to the area after the left col.
    // This is the deeply nested div after the left col's parent
    const possibleLists = el.querySelectorAll('.css-hv01ud, .css-jsem60, .css-7js8wp');
    for (let cont of possibleLists) {
      // Look for multiple number+label pairs
      const pairs = cont.querySelectorAll('.css-szffps');
      if (pairs.length >= 2) {
        // Return the parent containing all pairs
        return cont;
      }
    }
    // Fallback: try to find the largest div with multiple .css-szffps children
    const allSzffps = el.querySelectorAll('.css-szffps');
    if (allSzffps.length) {
      return allSzffps[0].parentElement.parentElement;
    }
    return null;
  }

  const headerRow = ['Columns (columns14)'];

  // Find our content columns
  const leftCol = findLeftCol(element);
  const rightCol = findRightCol(element);

  let cells;
  if (leftCol && rightCol) {
    cells = [headerRow, [leftCol, rightCol]];
  } else if (leftCol) {
    cells = [headerRow, [leftCol]];
  } else {
    cells = [headerRow, [element]];
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
