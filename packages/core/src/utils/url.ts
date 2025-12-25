/**
 * Normalizes a URL string to a URL object.
 * Adds 'https://' if protocol is missing.
 */
export function normalizeUrl(url: string): URL | null {
  try {
    let urlString = url.trim();
    if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
      urlString = 'https://' + urlString;
    }
    return new URL(urlString);
  } catch {
    return null;
  }
}

/**
 * Extracts path segments from a URL object, ignoring empty segments.
 */
export function extractPathSegments(url: URL): string[] {
  return url.pathname.split('/').filter((segment) => segment.length > 0);
}

/**
 * Checks if the hostname matches any of the allowed domains.
 * Handles 'www.' prefix automatically.
 */
export function matchHostname(url: URL, allowedDomains: string[]): boolean {
  const hostname = url.hostname.toLowerCase().replace(/^www\./, '');
  return allowedDomains.some((domain) => {
    const normalizedDomain = domain.toLowerCase().replace(/^www\./, '');
    return hostname === normalizedDomain || hostname.endsWith('.' + normalizedDomain);
  });
}

/**
 * Safely extracts a query parameter.
 */
export function getQueryParam(url: URL, param: string): string | null {
  return url.searchParams.get(param);
}
