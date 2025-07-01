/* global WebImporter */
export default function parse(element, { document }) {
  // The structure:
  // - The element contains a deep column layout, typically a two-column area
  // - Left: heading 'Brand Guidelines'
  // - Right: paragraphs

  // Find the deepest wrapper with two main children (for columns)
  let colContainer = element;
  let found = false;
  while (!found && colContainer) {
    const children = Array.from(colContainer.children).filter((el) => el.tagName === 'DIV');
    if (children.length === 2) {
      found = true;
      colContainer = children;
      break;
    }
    if (children.length === 1) {
      colContainer = children[0];
    } else {
      break;
    }
  }

  let columns;
  if (found && Array.isArray(colContainer) && colContainer.length === 2) {
    columns = colContainer;
  } else {
    // Fallback: find all direct child divs with text or paragraph content
    columns = Array.from(element.querySelectorAll(':scope > div'));
    if (columns.length < 2) {
      columns = [element];
    }
  }

  // Remove empty columns (e.g. decoration divs)
  columns = columns.filter(col => {
    // Only keep columns with visible text or at least one block-level content
    return !!col.textContent.trim();
  });

  // If we have more than 2 columns, use first 2; if less than 2, fill out
  if (columns.length < 2) {
    // Try to split by searching for the deepest text-content divs
    const textDivs = Array.from(element.querySelectorAll('div.textContents'));
    if (textDivs.length === 2) {
      columns = textDivs;
    } else {
      // Fallback: put all in a single column
      columns = [element];
    }
  }

  // Assemble the table rows
  const headerRow = ['Columns (columns13)'];
  const tableRow = columns.length === 2 ? [columns[0], columns[1]] : [columns[0]];
  const cells = [headerRow, tableRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
