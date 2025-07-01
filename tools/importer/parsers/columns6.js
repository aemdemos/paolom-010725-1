/* global WebImporter */
export default function parse(element, { document }) {
  // Find all logo violation blocks (6 total, each in .css-hv01ud.css-5dba7r)
  const cols = Array.from(element.querySelectorAll('.css-hv01ud.css-5dba7r'));

  // Defensive: if we do not find 6 blocks, fallback to all direct .css-jsem60 blocks
  let colBlocks;
  if (cols.length === 6) {
    colBlocks = cols;
  } else {
    // Fallback (should not happen for the provided HTML)
    colBlocks = Array.from(element.querySelectorAll('.css-jsem60'));
  }

  // Helper: receives a .css-hv01ud.css-5dba7r block and returns a DIV containing its logo img and warning text
  function getColContent(col) {
    // Find the main logo image (the first img inside .css-ld5pf8)
    const logoImgWrap = col.querySelector('.css-ld5pf8');
    let logoImg = logoImgWrap ? logoImgWrap.querySelector('img') : null;
    // Find the warning text (p in .textContents)
    const warningText = col.querySelector('.textContents p');
    const container = document.createElement('div');
    if (logoImg) container.appendChild(logoImg);
    if (warningText) container.appendChild(warningText);
    return container;
  }

  // Compose rows of columns: two rows of three columns each
  const firstRowCols = colBlocks.slice(0,3).map(getColContent);
  const secondRowCols = colBlocks.slice(3,6).map(getColContent);

  // Header as in the block info
  const headerRow = ['Columns (columns6)'];

  // Table array: header, then two content rows (each with three columns)
  const tableCells = [
    headerRow,
    firstRowCols,
    secondRowCols
  ];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
