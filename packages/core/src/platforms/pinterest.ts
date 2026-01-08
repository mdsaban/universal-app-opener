import { DeepLinkHandler, DeepLinkResult } from '../types';

type PinterestType = 'pin' | 'board' | 'user';

const patterns: Array<[type: PinterestType, regex: RegExp]> = [
  ['pin', /pinterest\.com\/pin\/(\d+)/],
  ['board', /pinterest\.com\/([^/?#]+)\/([^/?#]+)/],
  ['user', /pinterest\.com\/([^/?#]+)/],
];

const RESERVED_PATHS = new Set([
  'ideas',
  'search',
  'topics',
  'explore',
  'about',
  'business',
  'today',
  'settings',
]);

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
const builders: Record<PinterestType, (match: RegExpMatchArray, webUrl: string) => DeepLinkResult> =
  {
    pin: (match, webUrl) => {
      const pinId = match[2];
      return buildResult(webUrl, `pinterest://pin/${pinId}`);
    },

    board: (match, webUrl) => {
      const username = match[2];
      const board = match[3];
      return buildResult(webUrl, `pinterest://board/${username}/${board}`);
    },

    user: (match, webUrl) => {
      const username = match[2];
      return buildResult(webUrl, `pinterest://user/${username}`);
    },
  };

/**
 * Pinterest deeplink handler
 */
export const pinterestHandler: DeepLinkHandler = {
  hostnames: ['pinterest.com'],
  match: (url) => {
    for (const [type, regex] of patterns) {
      const matchResult = url.match(regex);
      if (!matchResult) continue;

      if (type === 'user' || type === 'board') {
        const firstSegment = matchResult[1];
        if (RESERVED_PATHS.has(firstSegment)) {
          return null;
        }
      }

      return [matchResult[0], type, ...matchResult.slice(1)] as RegExpMatchArray;
    }
    return null;
  },

  build: (webUrl, match) => {
    const type = match[1] as PinterestType;
    const builder = builders[type];

    return builder ? builder(match, webUrl) : buildResult(webUrl, null);
  },
};
