/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the deepest two-column layout
  function findColumns(el) {
    const children = Array.from(el.children);
    if (children.length === 2) {
      return children;
    }
    for (const child of children) {
      const result = findColumns(child);
      if (result) return result;
    }
    return null;
  }

  // Try to find the two columns; fallback to single block if not found
  let columns = findColumns(element);
  if (!columns) {
    columns = [element];
  }

  // For the specific HTML, the left column is the '01' and 'Brand Strategy' title
  // The right column is the rest of the text and image. We preserve the structure by referencing full containers.
  // Remove any extraneous wrappers inside column cells if necessary for clean structure.

  // Table header, per specification
  const headerRow = ['Columns (columns12)'];

  // Compose the row for the columns
  const contentRow = columns.length === 2 ? [columns[0], columns[1]] : [columns[0]];

  // Build block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
