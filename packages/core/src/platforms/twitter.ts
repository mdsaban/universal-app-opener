import { DeepLinkHandler } from '../types';

export const twitterHandler: DeepLinkHandler = {


  match: (url) => url.match(/(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]{1,15})(?:\/|$|\?)/),
  build: (webUrl, match) => {
    const username = match[1]; 
    return {
      webUrl,
      ios: `twitter://user?screen_name=${username}`,
      android: `intent://user?screen_name=${username}#Intent;scheme=twitter;package=com.twitter.android;end`,
      platform: 'twitter'
    };
  },
};