import { DeepLinkHandler } from '../types';

/**
 * Zoom Meeting Deep Link Handler
 *
 * Supports:
 * - Meeting links: https://zoom.us/j/1234567890
 * - Scheduled meeting links: https://zoom.us/s/1234567890
 * - Meeting links with password: https://zoom.us/j/1234567890?pwd=abcdef
 * - Meeting links with password in any query position: https://zoom.us/j/1234567890?uname=Guest&pwd=abcdef
 * - Meeting links from subdomains: https://us02web.zoom.us/j/1234567890
 *
 * Deep link schemes:
 * - iOS: zoomus://zoom.us/join?confno=<meeting_id>&pwd=<password>
 * - Android: intent://zoom.us/join?confno=<meeting_id>&pwd=<password>#Intent;scheme=zoomus;package=us.zoom.videomeetings;end
 */
export const zoomHandler: DeepLinkHandler = {
  match: (url) => {
    // Match zoom.us/[js]/<meeting_id> or *.zoom.us/[js]/<meeting_id>
    // Only capture the meeting ID here, password is extracted separately
    // Added 'i' flag for case-insensitive subdomain matching
    return url.match(/^https?:\/\/(?:[a-z0-9-]+\.)?zoom\.us\/[js]\/(\d+)/i);
  },

  build: (webUrl, match) => {
    const meetingId = match[1];

    // Extract password from query string (handles pwd in any position)
    // Password can contain alphanumeric, dash, underscore, and other URL-safe base64 characters
    const pwdMatch = webUrl.match(/[?&]pwd=([a-zA-Z0-9_-]+)/);
    const password = pwdMatch ? pwdMatch[1] : '';

    // Build the deep link path
    let deepLinkParams = `confno=${meetingId}`;
    if (password) {
      deepLinkParams += `&pwd=${password}`;
    }

    return {
      webUrl,
      ios: `zoomus://zoom.us/join?${deepLinkParams}`,
      android: `intent://zoom.us/join?${deepLinkParams}#Intent;scheme=zoomus;package=us.zoom.videomeetings;end`,
      platform: 'zoom',
    };
  },
};
