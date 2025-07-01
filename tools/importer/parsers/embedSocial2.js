/* global WebImporter */
export default function parse(element, { document }) {
  // This function is for the Embed (embedSocial2) block, which only applies if there is a social media embed present.
  // Per the critical review, if there is no social media URL or embed, nothing should be output or replaced.

  // Look for Twitter/X, Instagram, TikTok, Facebook embeds: anchor, iframe, embed, blockquote
  let url = '';
  // 1. Anchor tags
  const anchors = element.querySelectorAll('a[href]');
  for (const a of anchors) {
    if (/https?:\/\/(twitter|x|instagram|tiktok|facebook)\.com\//.test(a.href)) {
      url = a.href;
      break;
    }
  }
  // 2. iframe/embed
  if (!url) {
    const frames = element.querySelectorAll('iframe[src], embed[src]');
    for (const f of frames) {
      if (/https?:\/\/(twitter|x|instagram|tiktok|facebook)\.com\//.test(f.src)) {
        url = f.src;
        break;
      }
    }
  }
  // 3. blockquote
  if (!url) {
    const blockquotes = element.querySelectorAll('blockquote');
    for (const bq of blockquotes) {
      if (bq.cite && /https?:\/\/(twitter|x|instagram|tiktok|facebook)\.com\//.test(bq.cite)) {
        url = bq.cite;
        break;
      }
      if (bq.dataset && bq.dataset.url && /https?:\/\/(twitter|x|instagram|tiktok|facebook)\.com\//.test(bq.dataset.url)) {
        url = bq.dataset.url;
        break;
      }
    }
  }

  // If no supported embed found, do not replace or output anything
  if (!url) return;

  // Otherwise, create the block table as specified
  const headerRow = ['Embed (embedSocial2)'];
  const link = document.createElement('a');
  link.href = url;
  link.textContent = url;
  const rows = [headerRow, [link]];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
