import {
  instagramHandler,
  linkedinHandler,
  unknownHandler,
  youtubeHandler,
  githubHandler,
} from './platforms';
import { DeepLinkResult } from './types';

export * from './types';

const handlers = [youtubeHandler, linkedinHandler, instagramHandler, githubHandler];
/**
 * Produce a deep-linking descriptor for the given URL by matching it against known platform handlers.
 *
 * Trims surrounding whitespace from `url` before matching. If a supported platform pattern is detected,
 * the returned `DeepLinkResult` will include platform-specific deep link targets; otherwise it will contain
 * a fallback result that points to the web URL.
 *
 * @param url - The input URL to convert into a deep-link descriptor
 * @returns A `DeepLinkResult` containing the resolved `webUrl` and any platform-specific deep link targets
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

/**
 * Opens the appropriate deep link for a URL on the current platform or navigates to the web URL as a fallback.
 *
 * Detects the operating system (iOS, Android, or desktop) and, if a platform-specific deep link exists, navigates to it.
 * If a deep link is used and `fallbackToWeb` is true, navigates to the web URL after `fallbackDelay` milliseconds.
 * If no platform deep link is available, immediately navigates to the web URL.
 *
 * @param url - The original web URL to convert to a deep link or to navigate to directly.
 * @param options - Optional behaviour controls.
 * @param options.fallbackToWeb - When true, navigate to the web URL after `fallbackDelay` if a deep link was attempted (default: `true`).
 * @param options.fallbackDelay - Delay in milliseconds before performing the web fallback when a deep link was attempted (default: `2500`).
 * @param options.openInNewTab - When true, open the web URL in a new tab instead of the current window (default: `false`).
 */
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