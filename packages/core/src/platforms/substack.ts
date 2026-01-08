import { DeepLinkHandler } from '../types';

/**
 * Substack Deep Link Handler
 *
 * Supports:
 * - Publication home: https://example.substack.com
 * - Post pages: https://example.substack.com/p/post-slug
 * - About pages: https://example.substack.com/about
 * - Archive pages: https://example.substack.com/archive
 *
 * Note: Substack uses Universal Links (iOS) and App Links (Android) rather than
 * custom URL schemes. The native app intercepts HTTPS URLs directly when installed.
 * We return the HTTPS URL for both iOS and Android, which the app will handle.
 */
export const substackHandler: DeepLinkHandler = {
  hostnames: ['substack.com'],
  match: (url) => {
    // Match *.substack.com URLs and capture the subdomain and optional path
    return url.match(/^https?:\/\/([a-z0-9-]+)\.substack\.com(\/(?:p\/[^/?#]+|about|archive)?)?/i);
  },

  build: (webUrl, _match) => {
    // Substack uses Universal Links (iOS) and App Links (Android)
    // The native app intercepts HTTPS URLs directly - no custom scheme exists
    // Return the HTTPS URL for both platforms; the OS handles app interception
    return {
      webUrl,
      // iOS: Universal Links - the Substack app intercepts HTTPS URLs
      ios: webUrl,
      // Android: App Links - the Substack app intercepts HTTPS URLs
      android: webUrl,
      platform: 'substack',
    };
  },
};
