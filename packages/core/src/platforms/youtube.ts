import { DeepLinkHandler } from '../types';

export const youtubeHandler: DeepLinkHandler = {
  match: (url) => url.match(/youtube\.com\/watch\?v=([^&]+)/) ?? url.match(/youtu\.be\/([^?]+)/),

  build: (webUrl, match) => {
    const videoId = match[1];

    return {
      webUrl,
      ios: `vnd.youtube://watch?v=${videoId}`,
      android: `intent://watch?v=${videoId}#Intent;scheme=vnd.youtube;package=com.google.android.youtube;end`,
      platform: 'youtube',
    };
  },
};
