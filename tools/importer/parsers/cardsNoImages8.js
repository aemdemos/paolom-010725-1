/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table structure
  const cells = [];
  // Header row exactly as in the example
  cells.push(['Cards']);

  // Get all direct card containers (each card is a direct child of the outermost .css-xu0s1c)
  // There could be extra wrappers, so navigate carefully
  // Find the direct container holding all cards (should be 'css-xu0s1c')
  let cardsWrapper = element.querySelector(':scope > .css-xu0s1c');
  if (!cardsWrapper) {
    // fallback: maybe it's the element itself
    cardsWrapper = element;
  }
  // Now get all direct children with class 'css-hv01ud' (the cards)
  const cardContainers = Array.from(cardsWrapper.children).filter(child =>
    child.classList.contains('css-hv01ud')
  );

  cardContainers.forEach(card => {
    // Each card has a .css-ft707r inside, which contains two text blocks
    // First block is the heading, second is the description
    const main = card.querySelector('.css-ft707r');
    const textBlocks = main ? main.querySelectorAll(':scope > .textContents') : [];

    // Defensive: skip empty
    if (!textBlocks.length) return;

    // Create a fragment for the cell contents
    const frag = document.createDocumentFragment();
    if (textBlocks[0]) {
      // Use the paragraph inside as-is (do not clone)
      const para = textBlocks[0].querySelector('p, h1, h2, h3, h4, h5, h6');
      if (para) frag.appendChild(para);
    }
    if (textBlocks[1]) {
      if (frag.childNodes.length > 0) frag.appendChild(document.createElement('br'));
      const para = textBlocks[1].querySelector('p, h1, h2, h3, h4, h5, h6');
      if (para) frag.appendChild(para);
    }
    cells.push([frag]);
  });

  // Build the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
