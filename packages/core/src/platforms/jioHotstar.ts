import { DeepLinkHandler } from '../types';
import { getUrlWithoutProtocol } from '../utils';

// Matches Hotstar URLs with patterns like:
// - hotstar.com/in/movies/{movie-name}/{movie-id}
// - hotstar.com/shows/{show-name}/{show-id}
// - hotstar.com/shows/{show-name}/{show-id}/episode/{episode-id}
// - hotstar.com/sports/{sport-name}/{video-name}/{video-id}
// - hotstar.com/sports/{sport-name}/{video-name}/{video-id}/video/live/watch
// - jiohotstar.com/play/{id}
const PATTERNS: Array<[type: string, regex: RegExp]> = [
  [
    'shows and movies',
    /^(?:hotstar|jiohotstar|startv\.hotstar)(?:\.com)\/(?:in\/)?(?:shows|movies)(?:\/[a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)(?:\/(?:[a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+))?(?:\/watch)?$/,
  ],
  [
    'sports',
    /^(?:hotstar|jiohotstar|startv\.hotstar)(?:\.com)\/(?:in\/)?sports(?:\/[a-zA-Z0-9_-]+)(?:\/[a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)(?:\/video\/live)?(?:\/watch)?$/,
  ],
  ['play', /^(?:hotstar|jiohotstar|startv\.hotstar)(?:\.com)\/(?:in\/)?play\/([a-zA-Z0-9_-]+)$/],
];

export const jioHotstarHandler: DeepLinkHandler = {
  match: (url) => {
    const urlWithoutProtocol = getUrlWithoutProtocol(url);

    for (const [type, pattern] of PATTERNS) {
      const match = urlWithoutProtocol.match(pattern);
      if (match) return match;
    }

    return null;
  },

  build: (webUrl, match) => {
    const contentId = match[1];
    const videoId = match[2];

    if (videoId) {
      return {
        webUrl,
        ios: `hotstar://content/${videoId}`,
        android: `intent://${videoId}#Intent;scheme=hotstar;package=in.startv.hotstar;end`,
        platform: 'jiohotstar',
      };
    }

    return {
      webUrl,
      ios: `hotstar://content/${contentId}`,
      android: `intent://${contentId}#Intent;scheme=hotstar;package=in.startv.hotstar;end`,
      platform: 'jiohotstar',
    };
  },
};
