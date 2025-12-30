import { DeepLinkHandler, DeepLinkResult } from '../types'


/**
 * Regex patterns to detect supported LinkedIn URL types
 */
const patterns: Array<[type: string, regex: RegExp]> = [
  ['profile', /linkedin\.com\/in\/([^/?#]+)/],
  ['post', /linkedin\.com\/posts\/([^/?#]+)/],
  ['post', /linkedin\.com\/feed\/update\/(?:urn:li:activity:)?([^/?#]+)/],
  ['company', /linkedin\.com\/company\/([^/?#]+)/],
  ['job', /linkedin\.com\/jobs\/view\/([^/?#]+)/],
]


const getUrlWithoutProtocol = (url: string) => url.replace(/^https?:\/\//, '')

/**
 * Helper to assemble a valid deeplink result object
 */
const buildResult = (
  webUrl: string,
  ios: string | null
): DeepLinkResult => {
  const urlWithoutProtocol = getUrlWithoutProtocol(webUrl)

  return {
    webUrl,
    ios,
    android: `intent://${urlWithoutProtocol}#Intent;scheme=https;package=com.linkedin.android;S.browser_fallback_url=${webUrl};end`,
    platform: 'linkedin'
  }
}


/**
 * Maps each recognized link type to its deeplink URL formats
 */
const builders: Record<string, (id: string, webUrl: string) => DeepLinkResult> = {
  profile: (id, webUrl) =>
    buildResult(webUrl, `linkedin://in/${id}`),

  post: (id, webUrl) =>
    buildResult(webUrl, `linkedin://urn:li:activity:${id}`),

  company: (id, webUrl) =>
    buildResult(webUrl, `linkedin://company/${id}`),

  job: (id, webUrl) =>
    buildResult(webUrl, `linkedin://job/${id}`)
}

/**
* generates corresponding deeplink metadata based on url types
*/
export const linkedinHandler: DeepLinkHandler = {
  match: (url) => {
    for (const [type, regex] of patterns) {
      const matchResult = url.match(regex)
      if (matchResult)
        return [matchResult[0], type, matchResult[1]] as RegExpMatchArray
    }
    return null
  },

  build: (webUrl, match) => {
    const type = match[1]
    const id = match[2]
    const builder = builders[type]
    return builder
      ? builder(id, webUrl)
      : buildResult(webUrl, null)
  }
}
