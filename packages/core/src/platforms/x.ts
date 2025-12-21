import { DeepLinkHandler } from '../types';

export const xHandler: DeepLinkHandler = {
  match: (url) => url.match(/https?:\/\/(?:www\.)?x\.com\/([^/?]+)/),

  build: (webUrl, match) => {
    const username = match[1];

    return {
      webUrl,
      ios: `x://user?screen_name=${username}`,
      android: `intent://user?screen_name=${username}#Intent;scheme=x;package=com.twitter.android;end`,
      platform: 'x',
    };
  },
};
