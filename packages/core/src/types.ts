/**
 * Supported platform identifiers for deep link generation.
 */
export type Platform = 'youtube' | 'linkedin' | 'instagram' | 'spotify' | 'unknown';

/**
 * Result object containing platform-specific deep links.
 */
export interface DeepLinkResult {
  /** The original web URL that was processed */
  webUrl: string;
  /** iOS deep link URL, or null if not supported */
  ios: string | null;
  /** Android intent URL, or null if not supported */
  android: string | null;
  /** The detected platform for this URL */
  platform: Platform;
}

/**
 * Handler interface for platform-specific deep link generation.
 */
export interface DeepLinkHandler {
  /**
   * Tests if a URL matches this handler's platform.
   * @param url - The web URL to test
   * @returns RegExp match array if URL matches, null otherwise
   */
  match(url: string): RegExpMatchArray | null;
  
  /**
   * Builds platform-specific deep links from a matched URL.
   * @param url - The original web URL
   * @param match - The regex match array from the match() method
   * @returns DeepLinkResult with iOS and Android deep links
   */
  build(url: string, match: RegExpMatchArray): DeepLinkResult;
}