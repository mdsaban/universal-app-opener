import { DeepLinkHandler } from '../types';

export const whatsappHandler: DeepLinkHandler = {
  match: (url) => url.match(/^(?:https?:\/\/)?(?:www\.)?wa\.me\/\+?(\d+)(?:\?text=([^&]+))?$/),

  build: (webUrl, match) => {
    const phoneNumber = match[1];
    const text = match[2];

    const fullNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;

    const encodedText = text ? decodeURIComponent(text) : null;

    const query =
      `phone=${fullNumber}` + (encodedText ? `&text=${encodeURIComponent(encodedText)}` : '');

    return {
      webUrl: `https://web.whatsapp.com/send?${query}`,
      ios: `whatsapp://send?${query}`,
      android: `intent://send?${query}#Intent;scheme=whatsapp;package=com.whatsapp;end`,
      platform: 'whatsapp',
    };
  },
};
