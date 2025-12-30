import { DeepLinkHandler, Platform } from '../types';

export const githubHandler: DeepLinkHandler = {
  match: (url) =>
    url.match(
      /^https?:\/\/(?:www\.)?github\.com\/([^\/?#]+)\/?([^\/?#]+)?\/?([^\/?#]+)?\/?([^\/?#]+)?/,
    ),

  build: (webUrl, match) => {
    const [, owner, repo, type, id] = match;
    const routeMap: Record<string, string> = {
      pull: 'pull',
      issues: 'issues',
      blob: 'blob',
    };

    if (!repo) return createDeepLinks(webUrl, `user/${owner}`, owner);

    // for PR, Issues, Blob
    const route = routeMap[type ?? ''];
    if (route && id)
      return createDeepLinks(
        webUrl,
        `repo/${owner}/${repo}/${route}/${id}`,
        `${owner}/${repo}/${route}/${id}`,
      );

    // for repo
    return createDeepLinks(webUrl, `repo/${owner}/${repo}`, `${owner}/${repo}`);
  },
};

function createDeepLinks(webUrl: string, iosPath: string, androidPath: string) {
  return {
    webUrl,
    ios: `github://${iosPath}`,
    android: `intent://github.com/${androidPath}#Intent;scheme=https;package=com.github.android;end`,
    platform: 'github' as Platform,
  };
}
