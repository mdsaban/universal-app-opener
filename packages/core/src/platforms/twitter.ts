import { DeepLinkHandler } from '../types';

export const twitterHandler: DeepLinkHandler = {
  match: (url) =>
    url.match(/(?:twitter\.com|x\.com)\/([^/?]+)/),

  build: (webUrl, match) => {
    if (!match || !match[1]) {
      return null;
    }

    const username = match[1].toLowerCase();

    const reservedPaths = new Set([
      'home',
      'explore',
      'login',
      'i',
      'intent',
      'notifications',
      'messages',
      'settings',
    ]);

    if (reservedPaths.has(username)) {
      return null;
    }

    const deepLinks = {
      default: {
        ios: `twitter://user?screen_name=${encodeURIComponent(username)}`,
        android: `intent://user?screen_name=${encodeURIComponent(username)}#Intent;scheme=twitter;package=com.twitter.android;end`,
      },
    };

    const config = deepLinks.default;

    return {
      webUrl,
      ios: config.ios,
      android: config.android,
      platform: 'twitter',
    };
  },
};
