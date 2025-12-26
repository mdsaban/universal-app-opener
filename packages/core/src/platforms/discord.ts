import { DeepLinkHandler } from '../types';

export const discordHandler: DeepLinkHandler = {
  match: (url) => {
    return url.match(
      /discord\.(?:com\/channels\/([^/]+)\/([^/?#]+)|gg\/([^/?#]+)|com\/invite\/([^/?#]+))/,
    );
  },

  build: (webUrl, match) => {
    let deepLinkPath: string;

    const [, guildId, channelId, ggInvite, inviteCode] = match;

    if (channelId) {
      deepLinkPath = `channels/${guildId}/${channelId}`;
    } else {
      deepLinkPath = `invite/${ggInvite || inviteCode}`;
    }

    const urlWithoutProtocol = webUrl.replace(/^https?:\/\/(?:www\.)?/, '');

    return {
      webUrl,
      ios: `discord://${deepLinkPath}`,
      android: `intent://${urlWithoutProtocol}#Intent;scheme=discord;package=com.discord;end`,
      platform: 'discord',
    };
  },
};
