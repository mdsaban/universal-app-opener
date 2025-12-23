import { DeepLinkHandler } from '../types';

export const githubHandler: DeepLinkHandler = {
  match: (url) => url.match(/github\.com\/([^\/\?#]+)/),

  build: (webUrl, match) => {
    const owner = match[1];

    return {
      webUrl,
      ios: `github:///user/${owner}`,
      android: `intent://github.com/${owner}#Intent;scheme=https;package=com.github.android;end`,
      platform: 'github',
    };
  },
};
