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
  zoomHandler,
} from './platforms';
import { DeepLinkHandler, DeepLinkResult } from './types';
import { normalizeUrl } from './utils/normalizeUrl';

export * from './types';

const handlers: DeepLinkHandler[] = [
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
  zoomHandler,
];

const handlerMap = new Map<string, DeepLinkHandler>();

handlers.forEach((handler) => {
  handler.hostnames.forEach((hostname) => {
    if (handlerMap.has(hostname)) {
      console.warn(`Hostname collision: "${hostname}" claimed by multiple handlers`);
    }
    handlerMap.set(hostname, handler);
  });
});

function getHostname(url: string): string | null {
  try {
    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
    const hostname = new URL(urlWithProtocol).hostname;

    // naive root domain extraction (last two parts)
    const parts = hostname.split('.');

    // Handle second-level TLDs (e.g. domain.co.uk)
    // Heuristic: TLD is 2 chars (e.g. uk, br) AND SLD is short (<= 4 chars, e.g. co, com, org, ac).
    // This avoids trapping domains like m.twitch.tv where 'twitch' > 4.
    if (parts.length >= 3) {
      const tld = parts[parts.length - 1];
      const sld = parts[parts.length - 2];

      if (tld.length === 2 && sld.length <= 4) {
        return parts.slice(-3).join('.');
      }
    }

    // Default: take last 2 parts (e.g. youtube.com, youtu.be)
    if (parts.length >= 2) {
      return parts.slice(-2).join('.');
    }
    return hostname;
  } catch (e) {
    return null;
  }
}

export function generateDeepLink(url: string): DeepLinkResult {
  const webUrl = normalizeUrl(url);
  const hostname = getHostname(webUrl);

  if (hostname) {
    const handler = handlerMap.get(hostname);
    if (handler) {
      const match = handler.match(webUrl);
      if (match) {
        return handler.build(webUrl, match);
      }
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
