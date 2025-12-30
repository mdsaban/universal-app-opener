import { DeepLinkHandler } from '../types';

export const spotifyHandler: DeepLinkHandler = {
  match: (url) =>
    url.match(
      /^https?:\/\/open\.spotify\.com\/(track|artist|album|playlist|show|episode|audiobook)\/([^/?#]+)/,
    ),

  build: (webUrl, match) => {
    const type = match[1];
    const id = match[2];

    return {
      webUrl,
      ios: `spotify:${type}:${id}`,
      android: `intent://${type}/${id}#Intent;scheme=spotify;package=com.spotify.music;end`,
      platform: 'spotify',
    };
  },
};
