/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the content row by collecting all images and text paragraphs in the order they appear
  // For this block, we want to show the gradient image and its label together

  // Find all card containers (they have class with 'css-hv01ud')
  const cards = Array.from(element.querySelectorAll('[class*="css-hv01ud"]'));
  // For each card, get its image and its text
  const content = cards.map(card => {
    const fragment = document.createDocumentFragment();
    const img = card.querySelector('img');
    if (img) fragment.appendChild(img);
    const textDiv = card.querySelector('[class*="textContents"]');
    if (textDiv) {
      // include all contents, not just the first <p>
      Array.from(textDiv.childNodes).forEach(node => fragment.appendChild(node));
    }
    return fragment;
  });
  // Place all card fragments in the single content cell. If only one, use as is; if multiple, as array
  const contentCell = content.length > 1 ? content : (content[0] || '');

  const cells = [
    ['Embed (embedSocial5)'],
    [contentCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
