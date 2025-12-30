import { DeepLinkHandler } from '../types';

const PATTERNS: Array<[type: string, regex: RegExp]> = [
  ['login', /^twitch\.tv\/login\/?$/],
  ['game', /^twitch\.tv\/directory\/category\/([a-z0-9-]+)\/?$/],
  ['following', /^twitch\.tv\/directory\/following\/?$/],
  ['broadcast', /^twitch\.tv\/dashboard\/stream-manager\?game_id=(\d+)$/],
  ['stream', /^twitch\.tv\/([a-zA-Z0-9_]{4,25})\/?$/],
  // ['channel', /^twitch\.tv\/([a-zA-Z0-9_]{4,25})\/?$/],
  ['video', /^twitch\.tv\/videos\/(\d+)\/?$/],
  ['directory/tags', /^twitch\.tv\/directory\/tags\/([A-Za-z0-9_-]+)\/?$/],
  ['directory/all/tags', /^twitch\.tv\/directory\/all\/tags\/([A-Za-z0-9_-]+)\/?$/],
  [
    'clip',
    /^(?:(?:clips\.twitch\.tv\/)|(?:twitch\.tv\/[a-zA-Z0-9_]{4,25}\/clip\/))([A-Za-z0-9_-]+)\/?$/,
  ],
];

const getUrlWithoutProtocol = (url: string) =>
  url.replace(/^https?:\/\//, '').replace(/^www\./, '');

export const twitchHandler: DeepLinkHandler = {
  match: (url) => {
    const urlWithoutProtocol = getUrlWithoutProtocol(url);

    for (const [type, pattern] of PATTERNS) {
      const match = urlWithoutProtocol.match(pattern);
      if (match) return [match[0], type, match[1]] as RegExpMatchArray;
    }

    return null;
  },

  build: (webUrl, match) => {
    const matchUrl = match[0];
    const type = match[1];
    const id = match[2];

    let iosDeepLink = '';

    if (!id) {
      iosDeepLink = `twitch://${type}`;
    } else if (type === 'broadcast') {
      iosDeepLink = `twitch://broadcast?game_id=${id}`;
    } else {
      iosDeepLink = `twitch://${type}/${id}`;
    }

    return {
      webUrl,
      ios: iosDeepLink,
      android: `intent://${matchUrl}#Intent;scheme=https;package=tv.twitch.android.app;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`,
      platform: 'twitch',
    };
  },
};
