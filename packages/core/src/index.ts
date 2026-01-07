import {
  linkedinHandler,
  youtubeHandler,
  instagramHandler,
  spotifyHandler,
  substackHandler,
  threadsHandler,
  whatsappHandler,
  facebookHandler,
  redditHandler,
  discordHandler,
  githubHandler,
  pinterestHandler,
  twitchHandler,
  snapchatHandler,
  telegramHandler,
  unknownHandler,
} from './platforms';
import { DeepLinkResult } from './types';
import { normalizeUrl } from './utils/normalizeUrl';

export * from './types';

const handlers = [
  linkedinHandler,
  youtubeHandler,
  instagramHandler,
  spotifyHandler,
  substackHandler,
  threadsHandler,
  whatsappHandler,
  snapchatHandler,
  facebookHandler,
  redditHandler,
  discordHandler,
  githubHandler,
  pinterestHandler,
  twitchHandler,
  telegramHandler,
];
export function generateDeepLink(url: string): DeepLinkResult {
  const webUrl = normalizeUrl(url);

  for (const handler of handlers) {
    const match = handler.match(webUrl);
    if (match) {
      return handler.build(webUrl, match);
    }
  }

  return unknownHandler(webUrl);
}

export function detectOS(): 'ios' | 'android' | 'desktop' {
  if (typeof window === 'undefined') {
    return 'desktop';
  }

  const userAgent = window.navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  }

  if (/android/.test(userAgent)) {
    return 'android';
  }

  return 'desktop';
}

export interface OpenLinkOptions {
  fallbackToWeb?: boolean;
  fallbackDelay?: number;
  openInNewTab?: boolean;
}

export function openLink(url: string, options: OpenLinkOptions = {}): void {
  if (typeof window === 'undefined') return;

  const { fallbackToWeb = true, fallbackDelay = 2500, openInNewTab = false } = options;

  const os = detectOS();
  const result = generateDeepLink(url);

  let deepLink: string | null = null;

  if (os === 'ios' && result.ios) {
    deepLink = result.ios;
  } else if (os === 'android' && result.android) {
    deepLink = result.android;
  }

  if (deepLink && (os === 'ios' || os === 'android')) {
    window.location.href = deepLink;

    if (fallbackToWeb) {
      const start = Date.now();
      setTimeout(() => {
        const elapsed = Date.now() - start;
        const isHidden = typeof document !== 'undefined' && document.hidden;

        if (isHidden || elapsed > fallbackDelay + 1000) {
          return;
        }

        if (openInNewTab) {
          window.open(result.webUrl, '_blank');
        } else {
          window.location.href = result.webUrl;
        }
      }, fallbackDelay);
    }
  } else {
    if (openInNewTab) {
      window.open(result.webUrl, '_blank');
    } else {
      window.location.href = result.webUrl;
    }
  }
}
