export function decodeHtmlEntities(str: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.documentElement.textContent || str;
}
