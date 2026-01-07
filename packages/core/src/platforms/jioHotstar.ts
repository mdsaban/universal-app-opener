import { DeepLinkHandler } from '../types';
import { getUrlWithoutProtocol } from '../utils';

export const jioHotstarHandler: DeepLinkHandler = {
  match: (url) =>
    getUrlWithoutProtocol(url).match(
      /^(?:hotstar\.com|jiohotstar\.com|startv\.hotstar\.com)\/(?:in\/)?(?:shows|movies|live|tv|sport|play)(?:\/[a-zA-Z0-9_-]+)?\/([a-zA-Z0-9_-]+)(?:\/(?:[a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+))?(?:\/watch)?/,
    ),

  build: (webUrl, match) => {
    const contentId = match[1];
    const videoId = match[2];

    if (videoId) {
      return {
        webUrl,
        ios: `hotstar://content/${videoId}`,
        android: `intent://${videoId}#Intent;scheme=hotstar;package=in.startv.hotstar;end`,
        platform: 'jioHotstar',
      };
    }

    return {
      webUrl,
      ios: `hotstar://content/${contentId}`,
      android: `intent://${contentId}#Intent;scheme=hotstar;package=in.startv.hotstar;end`,
      platform: 'jioHotstar',
    };
  },
};
