import { DeepLinkHandler } from '../types';

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

    // Optional: protect against reserved paths
    const reserved = new Set([
      'explore',
      'accounts',
      'reels',
      'direct',
      'developer',
    ]);

    if (reserved.has(username)) {
      return {
        webUrl,
        ios: null,
        android: null,
        platform: 'instagram',
      };
    }

    const encodedUsername = encodeURIComponent(username);

    return {
      webUrl,
      ios: `instagram://user?username=${encodedUsername}`,
      android: `intent://www.instagram.com/${encodedUsername}/#Intent;package=com.instagram.android;scheme=https;end`,
      platform: 'instagram',
    };
  },
};
