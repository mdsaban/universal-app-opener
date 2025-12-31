import { DeepLinkHandler } from '../types';
export const twitterHandler: DeepLinkHandler = {
  // Matches: twitter.com, mobile.twitter.com, x.com
  // Captures: 1. Username, 2. Status ID (optional)
  match: (url) => url.match(/(?:twitter\.com|x\.com)\/(?:@)?([^/?\n]+)(?:\/status\/(\d+))?/),
  build: (webUrl, match) => {
    const username = match[1];
    const statusId = match[2];
    if (statusId) {
      // It's a specific tweet
      return {
        webUrl,
        ios: `twitter://status?id=${statusId}`,
        android: `intent://status?id=${statusId}#Intent;package=com.twitter.android;scheme=twitter;end`,
        platform: 'twitter',
      };
    }
    // It's a user profile
    return {
      webUrl,
      ios: `twitter://user?screen_name=${username}`,
      android: `intent://user?screen_name=${username}#Intent;package=com.twitter.android;scheme=twitter;end`,
      platform: 'twitter',
    };
  },
};
