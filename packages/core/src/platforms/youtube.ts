import { DeepLinkHandler } from '../types';
import { parseTimestampToSeconds } from '../utils';

function extractYouTubeVideoId(url: string): string | null {
  const patterns: RegExp[] = [
    /(?:(?:www|m)\.)?youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /(?:www\.)?youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

function extractTimestamp(url: string): string | null {
  const tMatch = url.match(/[?&]t=(\d+h(?:\d+m)?(?:\d+s)?|\d+m(?:\d+s)?|\d+s|\d+)/);
  if (tMatch && tMatch[1]) return tMatch[1];

  const startMatch = url.match(/[?&]start=(\d+)/);
  if (startMatch) return startMatch[1];

  return null;
}

export const youtubeHandler: DeepLinkHandler = {
  hostnames: ['youtube.com', 'youtu.be'],
  match: (url) => {
    const videoId = extractYouTubeVideoId(url);
    if (!videoId) return null;

    return [url, videoId] as RegExpMatchArray;
  },

  build: (webUrl, match) => {
    const videoId = match[1];
    const timestamp = extractTimestamp(webUrl);

    let iosDeepLink = `vnd.youtube://watch?v=${videoId}`;
    let androidDeepLink = `intent://watch?v=${videoId}`;

    if (timestamp) {
      const seconds = parseTimestampToSeconds(timestamp);

      if (seconds > 0) {
        const timestampParam = `&t=${seconds}s`;
        iosDeepLink += timestampParam;
        androidDeepLink += timestampParam;
      }
    }

    androidDeepLink += '#Intent;scheme=vnd.youtube;package=com.google.android.youtube;end';

    return {
      webUrl,
      ios: iosDeepLink,
      android: androidDeepLink,
      platform: 'youtube',
    };
  },
};
