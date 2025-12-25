import { DeepLinkHandler } from '../types';

export const instagramHandler: DeepLinkHandler = {
  match: (url) => url.match(/instagram\.com\/(?:(p|reel|tv)\/)?([^/?]+)/),

  build: (webUrl, match) => {
    const typeOfUrl = match[1];
    const id = match[2];

    const deepLinks: Record<string, { ios: string | null; android: string }> = {
      // ios to null? : to trigger Universal Link fallback, as custom scheme requires a numeric ID.
      p: {
        ios: null,
        android: `intent://instagram.com/p/${id}#Intent;package=com.instagram.android;scheme=https;end`,
      },
      reel: {
        ios: null,
        android: `intent://instagram.com/reel/${id}#Intent;package=com.instagram.android;scheme=https;end`,
      },
      tv: {
        ios: null,
        android: `intent://instagram.com/tv/${id}#Intent;package=com.instagram.android;scheme=https;end`,
      },
      // default represents the user profile
      default: {
        ios: `instagram://user?username=${id}`,
        android: `intent://user?username=${id}#Intent;scheme=instagram;package=com.instagram.android;end`,
      },
    };

    const config = deepLinks[typeOfUrl] || deepLinks.default;

    return {
      webUrl,
      ...config,
      platform: 'instagram',
    };
  },
};