import { DeepLinkHandler } from '../types';
import { discordHandler } from './discord';
import { facebookHandler } from './facebook';
import { githubHandler } from './github';
import { instagramHandler } from './instagram';
import { jioHotstarHandler } from './jioHotstar';
import { linkedinHandler } from './linkedin';
import { pinterestHandler } from './pinterest';
import { redditHandler } from './reddit';
import { spotifyHandler } from './spotify';
import { threadsHandler } from './threads';
import { twitchHandler } from './twitch';
import { unknownHandler } from './unknown';
import { whatsappHandler } from './whatsapp';
import { youtubeHandler } from './youtube';
import { snapchatHandler } from './snapchat';
import { telegramHandler } from "./telegram";

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
  telegramHandler,
  threadsHandler,
  twitchHandler,
  whatsappHandler,
  youtubeHandler,
  unknownHandler
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
  telegramHandler,
  threadsHandler,
  twitchHandler,
  whatsappHandler,
  youtubeHandler,
];
