import { DeepLinkHandler } from '../types';

export const githubHandler: DeepLinkHandler = {
  match: (url) => url.match(/github\.com\/([^\/\?#]+)(?:\/([^\/\?#]+)(?:\/(pull|blob)\/([^\?#]+))?)?/),

  build: (webUrl, match) => {
    const owner = match[1];
    const repo = match[2];
    const type = match[3];
    const remainder = match[4];

    // PR's and Blobs
    if (repo && type && remainder) {
      if (type === 'pull') {
        return {
          webUrl,
          ios: `github://repo/${owner}/${repo}/pull/${remainder}`,
          android: `intent://github.com/${owner}/${repo}/pull/${remainder}#Intent;scheme=https;package=com.github.android;end`,
          platform: 'github',
        };
      }
      
      if (type === 'blob') {
        return {
          webUrl,
          ios: `github://repo/${owner}/${repo}/blob/${remainder}`,
          android: `intent://github.com/${owner}/${repo}/blob/${remainder}#Intent;scheme=https;package=com.github.android;end`,
          platform: 'github',
        };
      }
    }

    // repo
    if (repo) {
      return {
        webUrl,
        ios: `github://repo/${owner}/${repo}`,
        android: `intent://github.com/${owner}/${repo}#Intent;scheme=https;package=com.github.android;end`,
        platform: 'github',
      };
    }

    // profile
    return {
      webUrl,
      ios: `github://user/${owner}`,
      android: `intent://github.com/${owner}#Intent;scheme=https;package=com.github.android;end`,
      platform: 'github',
    };
  },
};