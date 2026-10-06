/** Strip the inline markup used in content.ts, leaving the text a visitor reads. */
export function plain(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** A value is a placeholder while it is still in [SQUARE BRACKETS]. */
export function isPlaceholder(value: string): boolean {
  return value.trim().startsWith("[");
}
