import {
  instagramHandler,
  linkedinHandler,
  unknownHandler,
  youtubeHandler,
  spotifyHandler,
} from './platforms';
import { DeepLinkResult } from './types';

export * from './types';

const handlers = [youtubeHandler, linkedinHandler, instagramHandler, spotifyHandler];
export function generateDeepLink(url: string): DeepLinkResult {
  const webUrl = url.trim();

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
      setTimeout(() => {
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
