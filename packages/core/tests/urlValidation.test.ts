import { describe, it, expect } from 'vitest';
import { generateDeepLink } from '../src/index';
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
  zoomHandler,
  unknownHandler,
} from '../src/platforms';
import { normalizeUrl } from '../src/utils/normalizeUrl';

// Handler -> URL_s
const platformTestUrls: Record<string, string[]> = {
  linkedinHandler: ['https://www.linkedin.com/in/iamsaban/'],
  youtubeHandler: [
    'https://www.youtube.com/watch?v=BdgwH614LM0',
    'https://m.youtube.com/watch?v=BdgwH614LM0',
  ],
  instagramHandler: ['https://www.instagram.com/saban.talks/'],
  spotifyHandler: ['https://open.spotify.com/track/1dNIEtp7AY3oDAKCGg2XkH'],
  substackHandler: ['https://saban.substack.com/'],
  threadsHandler: ['https://www.threads.net/@someuser'],
  whatsappHandler: ['https://wa.me/1234567890'],
  facebookHandler: ['https://www.facebook.com/GitHub/'],
  redditHandler: ['https://www.reddit.com/r/javascript/'],
  discordHandler: ['https://discord.gg/discord'],
  githubHandler: ['https://github.com/github'],
  pinterestHandler: ['https://www.pinterest.com/pin/123456/'],
  twitchHandler: ['https://www.twitch.tv/directory/category/valorant'],
  snapchatHandler: ['https://www.snapchat.com/add/someuser'],
  telegramHandler: ['https://t.me/someuser'],
  zoomHandler: ['https://zoom.us/j/1234567890'],
};

// Handlers -> Patterns
const webUrlPatterns: Record<string, string[]> = {
  whatsappHandler: ['wa.me', 'web.whatsapp.com'],
  threadsHandler: ['threads.net'],
  youtubeHandler: ['youtube.com'],
  linkedinHandler: ['linkedin.com'],
  instagramHandler: ['instagram.com'],
  facebookHandler: ['facebook.com'],
  redditHandler: ['reddit.com'],
  discordHandler: ['discord.gg', 'discord.com'],
  githubHandler: ['github.com'],
  pinterestHandler: ['pinterest.com'],
  twitchHandler: ['twitch.tv'],
  snapchatHandler: ['snapchat.com'],
  telegramHandler: ['t.me'],
  zoomHandler: ['zoom.us'],
  spotifyHandler: ['spotify.com'],
  substackHandler: ['substack.com'],
};

describe('Deep link generation for all supported platforms', () => {
  it('should generate valid deep links for each supported platform', () => {
    for (const [handlerName, urls] of Object.entries(platformTestUrls)) {
      urls.forEach((url) => {
        const result = generateDeepLink(url);

        // Must not return unknown for supported URLs
        expect(result.platform).not.toBe('unknown');

        // At least one deep link or web URL must exist
        expect(result.ios || result.android || result.webUrl).toBeTruthy();

        // Check web URL contains expected domain/pattern
        const patterns = webUrlPatterns[handlerName];
        if (patterns && result.webUrl) {
          const matches = patterns.some((pattern) => result.webUrl.includes(pattern));
          expect(matches).toBe(true);
        }
      });
    }
  });

  it('should return unknownHandler for unsupported URLs', () => {
    const invalidUrls = [
      'https://example.com/random',
      'https://mycustomsite.com/',
      'not-a-url',
      'abc123',
    ];

    invalidUrls.forEach((url) => {
      const result = generateDeepLink(url);

      expect(result.platform).toBe('unknown');
      expect(result.ios).toBeNull();
      expect(result.android).toBeNull();

      // Web URL should still normalize
      const expected = normalizeUrl(url.startsWith('http') ? url : `https://${url}`);
      const normalizedOutput = normalizeUrl(result.webUrl);
      expect(normalizedOutput).toBe(expected);
    });
  });
});
