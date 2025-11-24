/**
 * Extract note links from text using [[Note Title]] syntax
 * @param {string} text - The text to search for links
 * @returns {string[]} Array of unique note titles found in links
 */
export function extractNoteLinks(text) {
  if (!text) return [];
  const regex = /\[\[([^\]]+)\]\]/g;
  const found = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    const linkTitle = match[1].trim();
    if (linkTitle) {
      found.push(linkTitle);
    }
  }
  // Remove duplicates
  return [...new Set(found)];
}

