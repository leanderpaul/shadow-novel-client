/**
 * Importing npm packages.
 */
import cheerio from 'cheerio';

/**
 * Importing user defined packages.
 */
import { Genres, Tags } from '../typescript/api';

/**
 * Importing and defining types.
 */
import type { EditorContent } from '../typescript/api';

/**
 * Declaring the constants.
 */

export function convertEditorContentToHTML(desc: EditorContent[]) {
  return desc.map((para) => `<${para.tag}>${para.text}</${para.tag}>`).join('\n');
}

export function convertHTMLToEditorContent(html?: string) {
  const content: EditorContent[] = [];
  if (!html) return content;
  const $ = cheerio.load(`<div id='html-content'>${html}</div>`);
  const children = $('#html-content').children();
  children.each((_index, element) => {
    const tag = element.name as EditorContent['tag'];
    element.children.forEach((child) => ($(child).text() ? content.push({ tag, text: $(child).text() }) : null));
  });
  return content.filter((block) => block.text);
}

export function capitalizeWord(str: string) {
  const firstCharacter = str.charAt(0).toUpperCase();
  return firstCharacter + str.slice(1).toLowerCase();
}

export function convertGenre(genre: Genres | string) {
  if (genre === Genres.SCI_FI) return 'Sci - Fi';
  return genre
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
}

export function convertTag(tag: Tags | string) {
  if (tag === Tags.R_18) return 'R - 18';
  if (tag === Tags.SCI_FI) return 'Sci - Fi';
  return tag
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
}

export function appendObjectToParams(params: URLSearchParams, obj: any) {
  const keys = Object.keys(obj);
  keys.forEach((key) => params.set(key, typeof obj[key] === 'string' ? obj[key] : obj[key].join(',')));
}
