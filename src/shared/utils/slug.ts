/**
 * Generates a URL-safe slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Ensures a slug is unique by appending a number if needed
 */
export function ensureUniqueSlug(
  baseSlug: string,
  existingSlugs: string[],
): string {
  let slug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

/**
 * Validates username format
 */
export function isValidUsername(username: string): boolean {
  if (!username || username.length < 3 || username.length > 30) {
    return false;
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return false;
  }

  if (/^[-_]|[-_]$/.test(username)) {
    return false;
  }

  return true;
}
