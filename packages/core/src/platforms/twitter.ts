import { DeepLinkHandler } from '../types';

export const twitterHandler: DeepLinkHandler = {
  match: (url) => url.match(/^(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([^/?#]+)/i),

  build: (webUrl, match) => {
    const username = match[1];
    
  if (['i', 'home', 'explore', 'notifications', 'messages', 'search', 'settings', 'compose', 'intent', 'login'].includes(username.toLowerCase())) {
      return null;
    }
    
    return {
      webUrl,
      ios: `twitter://user?screen_name=${username}`,
      android: `intent://user?screen_name=${username}#Intent;scheme=twitter;package=com.twitter.android;end`,
      platform: 'twitter',
    };
  },
};