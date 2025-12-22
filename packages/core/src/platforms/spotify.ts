import { DeepLinkHandler } from "../types";

/**
 * Handler for generating Spotify deep links from web URLs.
 *
 * Supports the following content types:
 * - `track` - Individual songs
 * - `artist` - Artist profiles
 * - `album` - Full albums
 * - `playlist` - User/editorial playlists
 * - `show` - Podcast shows
 * - `episode` - Podcast episodes
 * - `audiobook` - Audiobooks
 *
 */
export const spotifyHandler: DeepLinkHandler = {
  match: (url) => url.match(/spotify\.com\/(track|artist|album|playlist|show|episode|audiobook)\/([^/?]+)/),

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

