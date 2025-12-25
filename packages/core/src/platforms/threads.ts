import { DeepLinkHandler } from '../types';

export const threadsHandler: DeepLinkHandler = {
  match: (url) =>
    url.match(/^https?:\/\/(?:www\.)?threads\.net\/@([^/?]+)/),

  build: (webUrl, match) => {
    const username = match[1];
    const path = webUrl.replace(/^https?:\/\//, '');

    return {
      webUrl,
      ios: `barcelona://user?username=${username}`,
      android: `intent://${path}#Intent;scheme=https;package=com.instagram.barcelona;end`,
      platform: 'threads',
    };
  },
};