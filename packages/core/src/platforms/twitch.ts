import { DeepLinkHandler } from '../types';

type TwitchKind = 'channel' | 'stream' | 'video' | 'game' | 'following' | 'login';

function normalizeVideoId(raw: string): string {
  return raw.startsWith('v') ? raw : `v${raw}`;
}

function attachKind(
  kind: TwitchKind,
  value: string | null,
  match: RegExpMatchArray,
): RegExpMatchArray {
  const enriched = [match[0], kind, value ?? ''] as unknown as RegExpMatchArray;
  return enriched;
}

function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\/(?:www\.)?/, '');
}

export const twitchHandler: DeepLinkHandler = {
  match: (url) => {
    const channelMatch = url.match(
      /^https?:\/\/(?:www\.)?twitch\.tv\/(?!videos\/|directory\/|p\/|settings|login|signup)([^/?#]+)/,
    );
    if (channelMatch)
      return attachKind('channel', decodeURIComponent(channelMatch[1]), channelMatch);

    const playerChannelMatch = url.match(/^https?:\/\/player\.twitch\.tv\/\?channel=([^&#]+)/);
    if (playerChannelMatch)
      return attachKind('stream', decodeURIComponent(playerChannelMatch[1]), playerChannelMatch);

    const videoMatch = url.match(/^https?:\/\/(?:www\.)?twitch\.tv\/videos\/([A-Za-z0-9]+)/);
    if (videoMatch) return attachKind('video', videoMatch[1], videoMatch);

    const legacyVideoMatch = url.match(/^https?:\/\/(?:www\.)?twitch\.tv\/[^/?#]+\/v\/([0-9]+)/);
    if (legacyVideoMatch) return attachKind('video', legacyVideoMatch[1], legacyVideoMatch);

    const gameMatch = url.match(
      /^https?:\/\/(?:www\.)?twitch\.tv\/directory\/(?:game|category)\/([^/?#]+)/,
    );
    if (gameMatch) return attachKind('game', decodeURIComponent(gameMatch[1]), gameMatch);

    const followingMatch = url.match(/^https?:\/\/(?:www\.)?twitch\.tv\/directory\/following/);
    if (followingMatch) return attachKind('following', null, followingMatch);

    const loginMatch = url.match(/^https?:\/\/(?:www\.)?twitch\.tv\/login/);
    if (loginMatch) return attachKind('login', null, loginMatch);

    return null;
  },

  build: (webUrl, match) => {
    const kind = match[1] as TwitchKind;
    const value = match[2];
    const urlWithoutProtocol = stripProtocol(webUrl);

    let ios: string | null = null;

    switch (kind) {
      case 'channel':
      case 'stream':
        ios = `twitch://open?channel=${encodeURIComponent(value)}`;
        break;
      case 'video': {
        const videoId = normalizeVideoId(value);
        ios = `twitch://open?video=${videoId}`;
        break;
      }
      case 'game':
        ios = `twitch://open?game=${encodeURIComponent(value)}`;
        break;
      case 'following':
        ios = 'twitch://following';
        break;
      case 'login':
        ios = 'twitch://login';
        break;
      default:
        ios = null;
    }

    const android = `intent://${urlWithoutProtocol}#Intent;scheme=https;package=tv.twitch.android.app;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`;

    return {
      webUrl,
      ios,
      android,
      platform: 'twitch',
    };
  },
};
