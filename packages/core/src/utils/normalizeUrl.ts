export function normalizeUrl(input: string): string {
  let urlStr = input.trim();

  // 1. Ensure protocol
  if (!urlStr.startsWith('http://') && !urlStr.startsWith('https://')) {
    urlStr = 'https://' + urlStr;
  }

  let url: URL;
  try {
    url = new URL(urlStr);
  } catch {
    return urlStr; // fallback safely
  }

  // 2. Normalize hostname
  url.hostname = url.hostname.replace(/^(m\.|www\.)+/i, '');

  // 3. Remove tracking params
  url.searchParams.forEach((_, key) => {
    if (key.startsWith('utm_')) {
      url.searchParams.delete(key);
    }
  });

  // 4. Normalize trailing slash
  if (url.pathname.endsWith('/') && url.pathname !== '/') {
    url.pathname = url.pathname.slice(0, -1);
  }

  return url.toString();
}
