import { DeepLinkResult } from '../types';

/**
 * Fallback handler for URLs that don't match any known platform.
 * Returns the original web URL with null deep links.
 *
 * @param webUrl - The original web URL
 * @returns DeepLinkResult with null iOS and Android links
 */
export function unknownHandler(webUrl: string): DeepLinkResult {
  return {
    webUrl,
    ios: null,
    android: null,
    platform: 'unknown',
  };
}
