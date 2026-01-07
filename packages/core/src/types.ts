export type Platform =
  | 'youtube'
  | 'linkedin'
  | 'instagram'
  | 'spotify'
  | 'whatsapp'
  | 'facebook'
  | 'reddit'
  | 'threads'
  | 'discord'
  | 'github'
  | 'pinterest'
  | 'twitch'
  | 'snapchat'
  | 'telegram'
  | 'jioHotstar'
  | 'unknown';

export interface DeepLinkResult {
  webUrl: string;
  ios: string | null;
  android: string | null;
  platform: Platform;
}

/**
 * Defines a handler capable of:
 * 1. Matching a web URL against platform-specific patterns
 * 2. Building platform-specific deep links from a matched URL
 */
export interface DeepLinkHandler {
  /**
   * Attempts to match a given web URL against supported patterns.
   *
   * @param url - The input web URL to evaluate
   * @returns A RegExpMatchArray
   */
  match(url: string): RegExpMatchArray | null;

  /**
   * Builds platform-specific deep links from a previously matched URL.
   *
   * @param webUrl - The original web URL
   * @param match - The match result returned by {@link match}
   * @returns An object containing deep links for supported platforms
   */
  build(url: string, match: RegExpMatchArray): DeepLinkResult;
}
