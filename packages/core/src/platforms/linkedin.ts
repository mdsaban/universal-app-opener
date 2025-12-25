import { DeepLinkHandler } from '../types';

export const linkedinHandler: DeepLinkHandler = {
  match: (url) => url.match(/linkedin\.com\/in\/([^/?]+)/),

  build: (webUrl, match) => {
    const profileId = match[1];
    const urlWithoutProtocol = webUrl.replace(/^https?:\/\//, '');

    return {
      webUrl,
      ios: `linkedin://profile/${profileId}`,
      android: `intent://${urlWithoutProtocol}#Intent;scheme=https;package=com.linkedin.android;S.browser_fallback_url=${webUrl};end`,
      platform: 'linkedin',
    };
  },
};
