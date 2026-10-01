/**
 * Resolves static asset paths with Vite base path for GitHub Pages deployment.
 * Ensures no unwanted whitespace or duplicate slashes.
 */
export function resolveAssetUrl(path?: string): string {
  if (!path) return '';
  const trimmed = path.trim();
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }
  const base = (import.meta.env.BASE_URL || '/').trim();
  const cleanPath = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
}

