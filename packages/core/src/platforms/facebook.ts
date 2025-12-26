import { DeepLinkHandler } from '../types';

export const facebookHandler: DeepLinkHandler = {
  match: (url) => url.match(/^https?:\/\/(?:www\.|m\.)?facebook\.com\/(.*)$/),

  build: (webUrl, match) => {
    const url = `facebook.com/${match[1]}`;

    return {
      webUrl,
      ios: `fb://facewebmodal/f?href=${url}`,
      android: `intent://${url}#Intent;scheme=https;package=com.facebook.katana;end`,
      platform: 'facebook',
    };
  },
};
