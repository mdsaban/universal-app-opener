import { DeepLinkHandler } from '../types';

export const snapchatHandler: DeepLinkHandler = {
  hostnames: ['snapchat.com'],
  match: (url) => url.match(/^https?:\/\/(?:www\.)?snapchat\.com\/add\/([^/?#]+)/),

  build: (webUrl, match) => {
    const username = match[1];

    const iosDeeplink = `snapchat://add/${username}`;

    const androidDeeplink =
      `intent://add/${username}` +
      `#Intent;scheme=snapchat;package=com.snapchat.android;` +
      `S.browser_fallback_url=${encodeURIComponent(webUrl)};end`;

    return {
      webUrl,
      ios: iosDeeplink,
      android: androidDeeplink,
      platform: 'snapchat',
    };
  },
};
