import { DeepLinkHandler } from '../types';

/**
 * Reserved Instagram paths that should not be treated as usernames.
 * These paths return null deep links to prevent invalid redirects.
 */
const RESERVED_PATHS = new Set([
  'explore',
  'accounts',
  'reels',
  'direct',
  'developer',
]);

/**
 * Handler for generating Instagram deep links from web URLs.
 *
 * Supports the following content types:
 * - `p` - Posts (photos/carousels)
 * - `reel` - Reels (short videos)
 * - Profile URLs - User profiles
 *
 * Reserved paths like 'explore', 'accounts', 'reels', 'direct', 'developer'
 * are ignored and return null deep links to prevent invalid redirects.
 *
 */
export const instagramHandler: DeepLinkHandler = {
  match: (url) =>
    url.match(/instagram\.com\/(?:(p|reel)\/([^/?]+)|([^/?]+))/),

  build: (webUrl, match) => {
    // Case 1: Post or Reel
    if (match[1] && match[2]) {
      const type = match[1];      // "p" | "reel"
      const id = encodeURIComponent(match[2]);

      return {
        webUrl,
        ios: `instagram://${type}/${id}`,
        android: `intent://${type}/${id}#Intent;scheme=instagram;package=com.instagram.android;end`,
        platform: 'instagram',
      };
    }

    // Case 2: Profile
    const username = match[3];

    if (RESERVED_PATHS.has(username)) {
      return {
        webUrl,
        ios: null,
        android: null,
        platform: 'instagram',
      };
    }

    return {
      webUrl,
      ios: `instagram://user?username=${encodeURIComponent(username)}`,
      android: `intent://www.instagram.com/${encodeURIComponent(username)}/#Intent;package=com.instagram.android;scheme=https;end`,
      platform: 'instagram',
    };
  },
};
