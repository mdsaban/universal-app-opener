import { DeepLinkHandler } from '../types';

export const instagramHandler: DeepLinkHandler = {
  match: (url) =>
    url.match(/instagram\.com\/(?:(p|reel)\/([^/?]+)|([^/?]+))/),

  build: (webUrl, match) => {
    // Case 1: Post or Reel
    if (match[1] && match[2]) {
      const type = match[1];      // "p" | "reel"
      const id = match[2];

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

    return {
      webUrl,
      ios: `instagram://user?username=${username}`,
      android: `intent://user?username=${username}#Intent;scheme=instagram;package=com.instagram.android;end`,
      platform: 'instagram',
    };
  },
};
