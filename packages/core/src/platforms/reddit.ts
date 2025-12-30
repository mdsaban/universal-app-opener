import { DeepLinkHandler } from '../types';

export const redditHandler: DeepLinkHandler = {
  match: (url) => url.match(/^(?:https?:\/\/)?(?:[\w-]+\.)?reddit\.com\/(u|user|r)\/([^/?#]+)/i),

  build: (webUrl, match) => {
    const type = match[1]; // u | user | r
    const value = match[2];

    if (type === 'r') {
      return {
        webUrl,
        ios: `reddit://r/${value}`,
        android: `intent://r/${value}#Intent;scheme=reddit;package=com.reddit.android;end`,
        platform: 'reddit',
      };
    }

    return {
      webUrl,
      ios: `reddit://user/${value}`,
      android: `intent://user/${value}#Intent;scheme=reddit;package=com.reddit.android;end`,
      platform: 'reddit',
    };
  },
};
