import { describe, it, expect } from 'vitest';
import { generateDeepLink } from '../index';
import type { PlatformLink, SocialLinks } from './types';

function generateDeepLinkTest(platform: string, links: PlatformLink[]) {
  describe(platform, () => {
    for (const link of links) {
      it(link.name, () => {
        const deepLink = generateDeepLink(link.url);
        expect(deepLink).toBeDefined();
        expect(deepLink.platform).toBe(platform);
        expect(deepLink.webUrl).toBe(link.webUrl);
        expect(deepLink.ios).toBe(link.ios);
        expect(deepLink.android).toBe(link.android);
      });
    }
  });
}

const testCases: SocialLinks = {
  discord: [
    {
      name: 'discord channel',
      url: 'https://discord.com/channels/1451197679739863177/1451197680259829793',
      webUrl: 'https://discord.com/channels/1451197679739863177/1451197680259829793',
      ios: 'discord://channels/1451197679739863177/1451197680259829793',
      android:
        'intent://discord.com/channels/1451197679739863177/1451197680259829793#Intent;scheme=discord;package=com.discord;end',
    },
    {
      name: 'discord invite',
      url: 'https://discord.gg/MWwnUKaq',
      webUrl: 'https://discord.gg/MWwnUKaq',
      ios: 'discord://invite/MWwnUKaq',
      android: 'intent://discord.gg/MWwnUKaq#Intent;scheme=discord;package=com.discord;end',
    },
  ],
  facebook: [
    {
      name: 'facebook profile',
      url: 'https://www.facebook.com/Google/',
      webUrl: 'https://facebook.com/Google',
      ios: 'fb://facewebmodal/f?href=facebook.com/Google',
      android: 'intent://facebook.com/Google#Intent;scheme=https;package=com.facebook.katana;end',
    },
  ],
  github: [
    {
      name: 'github profile',
      url: 'https://github.com/kishandev2509',
      webUrl: 'https://github.com/kishandev2509',
      ios: 'github://user/kishandev2509',
      android:
        'intent://github.com/kishandev2509#Intent;scheme=https;package=com.github.android;end',
    },
  ],
  instagram: [
    {
      name: 'instagram profile',
      url: 'https://www.instagram.com/kishand.ev/',
      webUrl: 'https://instagram.com/kishand.ev',
      ios: 'instagram://user?username=kishand.ev',
      android:
        'intent://user?username=kishand.ev#Intent;scheme=instagram;package=com.instagram.android;end',
    },
  ],
  linkedin: [
    {
      name: 'linkedin profile',
      url: 'https://www.linkedin.com/in/kishandev2509/',
      webUrl: 'https://linkedin.com/in/kishandev2509',
      ios: 'linkedin://in/kishandev2509',
      android:
        'intent://linkedin.com/in/kishandev2509#Intent;scheme=https;package=com.linkedin.android;S.browser_fallback_url=https://linkedin.com/in/kishandev2509;end',
    },
  ],
  pinterest: [
    {
      name: 'pinterest pin',
      url: 'https://www.pinterest.com/pin/paisajes-in-2023--55098795435856717/',
      webUrl: 'https://pinterest.com/pin/paisajes-in-2023--55098795435856717',
      ios: 'pinterest://board/pin/paisajes-in-2023--55098795435856717',
      android:
        'intent://pinterest.com/pin/paisajes-in-2023--55098795435856717#Intent;scheme=https;package=com.pinterest;S.browser_fallback_url=https%3A%2F%2Fpinterest.com%2Fpin%2Fpaisajes-in-2023--55098795435856717;end',
    },
  ],
  reddit: [
    {
      name: 'reddit post',
      url: 'https://www.reddit.com/r/IndiaTech/comments/1q6dk9y/vlc_and_where_is_my_train/#lightbox',
      webUrl: 'https://reddit.com/r/IndiaTech/comments/1q6dk9y/vlc_and_where_is_my_train#lightbox',
      ios: 'reddit://r/IndiaTech',
      android: 'intent://r/IndiaTech#Intent;scheme=reddit;package=com.reddit.android;end',
    },
  ],
  snapchat: [
    {
      name: 'snapchat add profile',
      url: 'https://www.snapchat.com/add/random',
      webUrl: 'https://snapchat.com/add/random',
      ios: 'snapchat://add/random',
      android:
        'intent://add/random#Intent;scheme=snapchat;package=com.snapchat.android;S.browser_fallback_url=https%3A%2F%2Fsnapchat.com%2Fadd%2Frandom;end',
    },
  ],
  spotify: [
    {
      name: 'spotify artist',
      url: 'https://open.spotify.com/artist/4YRxDV8wJFPHPTeXepOstw',
      webUrl: 'https://open.spotify.com/artist/4YRxDV8wJFPHPTeXepOstw',
      ios: 'spotify:artist:4YRxDV8wJFPHPTeXepOstw',
      android:
        'intent://artist/4YRxDV8wJFPHPTeXepOstw#Intent;scheme=spotify;package=com.spotify.music;end',
    },
  ],
  substack: [
    {
      name: 'substack profile',
      url: 'https://example.substack.com',
      webUrl: 'https://example.substack.com/',
      ios: 'https://example.substack.com/',
      android: 'https://example.substack.com/',
    },
  ],
  telegram: [
    {
      name: 'telegram profile',
      url: 'https://t.me/kishandev2509',
      webUrl: 'https://t.me/kishandev2509',
      ios: 'tg://resolve?domain=kishandev2509',
      android: 'intent://resolve?domain=kishandev2509#Intent;scheme=tg;end',
    },
  ],
  threads: [
    {
      name: 'threads profile',
      url: 'https://www.threads.net/@iamsaban',
      webUrl: 'https://threads.net/@iamsaban',
      ios: 'barcelona://user?username=iamsaban',
      android:
        'intent://threads.net/@iamsaban#Intent;scheme=https;package=com.instagram.barcelona;end',
    },
  ],
  twitch: [
    {
      name: 'twitch profile',
      url: 'https://www.twitch.tv/directory/tags/80427d95-bb46-42d3-bf4d-408e9bdca49a',
      webUrl: 'https://twitch.tv/directory/tags/80427d95-bb46-42d3-bf4d-408e9bdca49a',
      ios: 'twitch://directory/tags/80427d95-bb46-42d3-bf4d-408e9bdca49a',
      android:
        'intent://twitch.tv/directory/tags/80427d95-bb46-42d3-bf4d-408e9bdca49a#Intent;scheme=https;package=tv.twitch.android.app;S.browser_fallback_url=https%3A%2F%2Ftwitch.tv%2Fdirectory%2Ftags%2F80427d95-bb46-42d3-bf4d-408e9bdca49a;end',
    },
  ],
  whatsapp: [
    {
      name: 'whatsapp',
      url: 'https://wa.me/919876543210',
      webUrl: 'https://web.whatsapp.com/send?phone=+919876543210',
      ios: 'whatsapp://send?phone=+919876543210',
      android: 'intent://send?phone=+919876543210#Intent;scheme=whatsapp;package=com.whatsapp;end',
    },
  ],
  youtube: [
    {
      name: 'youtube with video id',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      webUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
      ios: 'vnd.youtube://watch?v=dQw4w9WgXcQ',
      android:
        'intent://watch?v=dQw4w9WgXcQ#Intent;scheme=vnd.youtube;package=com.google.android.youtube;end',
    },
    {
      name: 'youtube with video id and time',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10s',
      webUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ&t=10s',
      ios: 'vnd.youtube://watch?v=dQw4w9WgXcQ&t=10s',
      android:
        'intent://watch?v=dQw4w9WgXcQ&t=10s#Intent;scheme=vnd.youtube;package=com.google.android.youtube;end',
    },
  ],
  zoom: [
    {
      name: 'zoom meeting',
      url: 'https://zoom.us/j/1234567890',
      webUrl: 'https://zoom.us/j/1234567890',
      ios: 'zoomus://zoom.us/join?confno=1234567890',
      android:
        'intent://zoom.us/join?confno=1234567890#Intent;scheme=zoomus;package=us.zoom.videomeetings;end',
    },
  ],
  unknown: [
    {
      name: 'unknown',
      url: 'https://www.google.com',
      webUrl: 'https://google.com/',
      ios: null,
      android: null,
    },
  ],
};

Object.entries(testCases).forEach(([platform, links]) => {
  generateDeepLinkTest(platform, links);
});
