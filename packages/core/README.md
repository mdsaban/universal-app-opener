# Universal App Opener

A zero-dependency JavaScript library that converts standard HTTP URLs (YouTube, LinkedIn) into Native Mobile Deep Links (Custom Schemes & Android Intents).

## Installation

```bash
npm install universal-app-opener
```

```bash
pnpm add universal-app-opener
```

```bash
yarn add universal-app-opener
```

## Usage

### One-Click Open (Recommended)

The simplest way to open a link - automatically detects platform and opens the appropriate app or web URL:

```typescript
import { openLink } from 'universal-app-opener';

openLink('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
```

**With options:**

```typescript
import { openLink } from 'universal-app-opener';

openLink('https://www.linkedin.com/in/iamsaban/', {
  fallbackToWeb: true, // Fallback to web if app not installed (default: true)
  fallbackDelay: 2500, // Delay before fallback in ms (default: 2500)
  openInNewTab: false, // Open web URL in new tab (default: false)
});
```

### Advanced Usage

If you need more control, you can use the lower-level APIs:

```typescript
import { generateDeepLink, detectOS } from 'universal-app-opener';

const result = generateDeepLink('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
const os = detectOS();

if (os === 'ios' && result.ios) {
  window.location.href = result.ios;
} else if (os === 'android' && result.android) {
  window.location.href = result.android;
} else {
  window.open(result.webUrl, '_blank');
}
```

### CommonJS Usage

```javascript
const { openLink, generateDeepLink } = require('universal-app-opener');

openLink('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
```

## API Reference

### `openLink(url: string, options?: OpenLinkOptions): void`

Opens a URL in the appropriate app or browser. Automatically detects platform and handles deep linking.

**Parameters:**

- `url` (string): The web URL to open (YouTube or LinkedIn)
- `options` (optional): Configuration object
  - `fallbackToWeb` (boolean): Fallback to web URL if app not installed (default: `true`)
  - `fallbackDelay` (number): Delay in milliseconds before fallback (default: `2500`)
  - `openInNewTab` (boolean): Open web URL in new tab (default: `false`)

**Example:**

```typescript
openLink('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
```

### `generateDeepLink(url: string): DeepLinkResult`

Converts a web URL into platform-specific deep links. Returns the deep link data without opening it.

**Parameters:**

- `url` (string): The web URL to convert (YouTube or LinkedIn)

**Returns:**

```typescript
interface DeepLinkResult {
  webUrl: string; // Original web URL
  ios: string | null; // iOS deep link (custom scheme)
  android: string | null; // Android deep link (intent URL)
  platform: 'youtube' | 'linkedin' | 'unknown';
}
```

**Supported Platforms:**

- YouTube: `youtube.com/watch?v=*` and `youtu.be/*`
- LinkedIn: `linkedin.com/in/*`

### `detectOS(): 'ios' | 'android' | 'desktop'`

Detects the current operating system based on user agent.

**Returns:**

- `'ios'` - iPhone, iPad, or iPod
- `'android'` - Android devices
- `'desktop'` - Desktop browsers or unknown

## Examples

### YouTube Video

```typescript
const result = generateDeepLink('https://www.youtube.com/watch?v=BdgwH614LM0');
// result.ios: 'vnd.youtube://watch?v=BdgwH614LM0'
// result.android: 'intent://watch?v=BdgwH614LM0#Intent;scheme=vnd.youtube;package=com.google.android.youtube;end'
```

### LinkedIn Profile

```typescript
const result = generateDeepLink('https://www.linkedin.com/in/iamsaban/');
// result.ios: 'linkedin://in/iamsaban'
// result.android: 'intent://in/iamsaban#Intent;scheme=linkedin;package=com.linkedin.android;end'
```

### Unknown URL

```typescript
const result = generateDeepLink('https://example.com');
// result.ios: null
// result.android: null
// result.platform: 'unknown'
```

## Demo

Try it out: [Live Demo](https://mdsaban.github.io/universal-app-opener/)

## License

MIT
