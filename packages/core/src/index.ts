import { instagramHandler, linkedinHandler, spotifyHandler, unknownHandler, youtubeHandler } from "./platforms";
import { DeepLinkResult } from "./types";

export * from './types';

/**
 * Array of platform handlers in order of matching priority.
 * The first handler whose match() returns a result will be used.
 */
const handlers = [
  youtubeHandler,
  linkedinHandler,
  instagramHandler,
  spotifyHandler
];

/**
 * Generates platform-specific deep links from a web URL.
 *
 * @param url - The web URL to convert (YouTube, LinkedIn, Instagram, or Spotify)
 * @returns DeepLinkResult containing iOS and Android deep links
 *
 * @example
 * const result = generateDeepLink('https://youtube.com/watch?v=abc123');
 * // result.ios = 'vnd.youtube://watch?v=abc123'
 * // result.android = 'intent://watch?v=abc123#Intent;scheme=vnd.youtube;...'
 */
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

/**
 * Detects the current operating system based on the user agent.
 *
 * @returns 'ios' for iPhone/iPad/iPod, 'android' for Android devices, 'desktop' otherwise
 */
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

/**
 * Options for the openLink function.
 */
export interface OpenLinkOptions {
  /** Whether to fall back to the web URL if the app doesn't open. Default: true */
  fallbackToWeb?: boolean;
  /** Delay in milliseconds before falling back to web. Default: 2500 */
  fallbackDelay?: number;
  /** Whether to open the fallback URL in a new tab. Default: false */
  openInNewTab?: boolean;
}

/**
 * Opens a URL in the native app if available, with optional fallback to web.
 *
 * On mobile devices, attempts to open the deep link first. If the app is not
 * installed or doesn't respond within fallbackDelay, falls back to the web URL.
 *
 * @param url - The web URL to open
 * @param options - Configuration options for opening behavior
 *
 * @example
 * // Opens YouTube app on mobile, falls back to web after 2.5s
 * openLink('https://youtube.com/watch?v=abc123');
 *
 * // Opens in new tab on desktop, no fallback
 * openLink('https://youtube.com/watch?v=abc123', { fallbackToWeb: false, openInNewTab: true });
 */
export function openLink(url: string, options: OpenLinkOptions = {}): void {
  const {
    fallbackToWeb = true,
    fallbackDelay = 2500,
    openInNewTab = false
  } = options;

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
