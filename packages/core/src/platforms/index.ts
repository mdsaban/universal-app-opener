import { DeepLinkHandler } from '../types';
import { discordHandler } from './discord';
import { facebookHandler } from './facebook';
import { githubHandler } from './github';
import { instagramHandler } from './instagram';
import { jioHotstarHandler } from './jioHotstar';
import { linkedinHandler } from './linkedin';
import { pinterestHandler } from './pinterest';
import { redditHandler } from './reddit';
import { snapchatHandler } from './snapchat';
import { spotifyHandler } from './spotify';
import { substackHandler } from './substack';
import { telegramHandler } from './telegram';
import { threadsHandler } from './threads';
import { twitchHandler } from './twitch';
import { unknownHandler } from './unknown';
import { whatsappHandler } from './whatsapp';
import { youtubeHandler } from './youtube';
import { zoomHandler } from './zoom';

export {
  discordHandler,
  facebookHandler,
  githubHandler,
  instagramHandler,
  jioHotstarHandler,
  linkedinHandler,
  pinterestHandler,
  redditHandler,
  snapchatHandler,
  spotifyHandler,
  substackHandler,
  telegramHandler,
  threadsHandler,
  twitchHandler,
  unknownHandler,
  whatsappHandler,
  youtubeHandler,
  zoomHandler
};

export const handlers: DeepLinkHandler[] = [
  discordHandler,
  facebookHandler,
  githubHandler,
  instagramHandler,
  jioHotstarHandler,
  linkedinHandler,
  pinterestHandler,
  redditHandler,
  snapchatHandler,
  spotifyHandler,
  substackHandler,
  telegramHandler,
  threadsHandler,
  twitchHandler,
  whatsappHandler,
  youtubeHandler,
  zoomHandler,
];
