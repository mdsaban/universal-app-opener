import { DeepLinkHandler } from '../types';

export const telegramHandler: DeepLinkHandler = {
  match: (url) =>
    url.match(
      /(?:^|\/\/)(?:www\.)?(?:t\.me|telegram\.me)\/([^/?]+)(?:\/(\d+))?/
    ),

  build: (webUrl, match) => {
    const username = match[1];
    const messageId = match[2];

    return {
      webUrl,
      ios: messageId
        ? `tg://resolve?domain=${username}&post=${messageId}`
        : `tg://resolve?domain=${username}`,
      android: messageId
        ? `intent://resolve?domain=${username}&post=${messageId}#Intent;scheme=tg;end`
        : `intent://resolve?domain=${username}#Intent;scheme=tg;end`,
      platform: 'telegram',
    };
  },
};
