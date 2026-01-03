import { DeepLinkHandler } from '../types';

export const twitterHandler: DeepLinkHandler = {
  match: (url) => url.match(/^(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([^/?#]+)/i),

  build: (webUrl, match) => {
    const username = match[1];
    
    // Skip if it's a known non-profile path
    const nonProfilePaths = ['i', 'home', 'explore', 'notifications', 'messages', 'search', 'settings', 'compose', 'intent', 'login'];
    
    if (nonProfilePaths.includes(username.toLowerCase())) {
      // Return a fallback object instead of null
      return {
        webUrl,
        ios: webUrl,
        android: webUrl,
        platform: 'twitter',
      };
    }
    
    return {
      webUrl,
      ios: `twitter://user?screen_name=${username}`,
      android: `intent://user?screen_name=${username}#Intent;scheme=twitter;package=com.twitter.android;end`,
      platform: 'twitter',
    };
  },
};