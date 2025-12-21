import { DeepLinkHandler } from "../types";

export const spotifyHandler: DeepLinkHandler = {
  match: (url) => url.match(/spotify\.com\/(track|artist|playlist)\/([^/?]+)/),

  build: (webUrl, match) => {
    const type = match[1];
    const id = match[2];

    return {
      webUrl,
      ios: `spotify://${type}/${id}`,
      android: `intent://${type}/${id}#Intent;scheme=spotify;package=com.spotify.music;end`,
      platform: 'spotify',
    };
  },
};

