import { DeepLinkHandler, DeepLinkResult } from '../types';

/**
 * Regex patterns to detect supported Pinterest URL types
 */
const patterns: Array<[type: string, regex: RegExp]> = [
  ['pin', /pinterest\.com\/pin\/(\d+)/],
  ['board', /pinterest\.com\/([^/?#]+)\/([^/?#]+)/],
  ['user', /pinterest\.com\/([^/?#]+)/],
];

const getUrlWithoutProtocol = (url: string) => url.replace(/^https?:\/\//, '');

/**
 * Helper to assemble a DeepLinkResult
 */
const buildResult = (webUrl: string, ios: string | null): DeepLinkResult => {
  const urlWithoutProtocol = getUrlWithoutProtocol(webUrl);

  return {
    webUrl,
    ios,
    android:
      `intent://${urlWithoutProtocol}` +
      `#Intent;scheme=https;package=com.pinterest;` +
      `S.browser_fallback_url=${encodeURIComponent(webUrl)};end`,
    platform: 'pinterest',
  };
};

/**
 * Map each URL type to its deeplink builder
 */
const builders: Record<string, (match: RegExpMatchArray, webUrl: string) => DeepLinkResult> = {
  pin: (match, webUrl) => {
    const pinId = match[1];
    return buildResult(webUrl, `pinterest://pin/${pinId}`);
  },

  board: (match, webUrl) => {
    const username = match[1];
    const board = match[2];
    return buildResult(webUrl, `pinterest://board/${username}/${board}`);
  },

  user: (match, webUrl) => {
    const username = match[1];
    return buildResult(webUrl, `pinterest://user/${username}`);
  },
};

/**
 * Pinterest deeplink handler
 */
export const pinterestHandler: DeepLinkHandler = {
  match: (url) => {
    for (const [type, regex] of patterns) {
      const matchResult = url.match(regex);
      if (matchResult) return [matchResult[0], type, ...matchResult.slice(1)] as RegExpMatchArray;
    }
    return null;
  },

  build: (webUrl, match) => {
    const type = match[1];
    const builder = builders[type];

    return builder ? builder(match, webUrl) : buildResult(webUrl, null);
  },
};
