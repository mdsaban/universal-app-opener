# Contributing to Universal App Opener Core

Thank you for your interest in contributing! This guide will help you set up the project, add support for new platforms, and test your changes on a mobile device.

## Prerequisites

- **Node.js** (v22 or later)
- **pnpm** (v9 or later)
- A mobile device (iOS or Android) connected to the same Wi-Fi network as your computer.

## Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/mdsaban/universal-app-opener.git
    cd universal-app-opener
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

## Development Workflow

The project uses a monorepo structure. You can run the core library in watch mode and the demo app simultaneously from the root.

1.  **Start the development server:**

    ```bash
    pnpm dev
    ```

    This command uses Turbo to run:
    - `packages/core`: Builds in watch mode (`tsup --watch`).
    - `apps/demo`: Starts the Vite development server.

2.  **Access the Demo:**
    Check the terminal output for the **Network** URL (e.g., `http://192.168.1.5:5173`).

    > **Note:** The demo is configured to expose the server to your local network (`host: 0.0.0.0`).

## Adding a New Platform

To add support for a new app (e.g., Twitter/X, TikTok), follow these steps in `packages/core`:

1.  **Create a Handler:**
    Create a new file in `packages/core/src/platforms/` (e.g., `twitter.ts`).

    ```typescript
    // packages/core/src/platforms/twitter.ts
    import { DeepLinkHandler } from '../types';

    export const twitterHandler: DeepLinkHandler = {
      // Regex to match the web URL
      match: (url) => url.match(/twitter\.com\/([^/?]+)/),

      build: (webUrl, match) => {
        const username = match[1];
        return {
          webUrl,
          // Scheme for iOS (check online resources for specific app schemes)
          ios: `twitter://user?screen_name=${username}`,
          // Intent for Android
          android: `intent://user?screen_name=${username}#Intent;scheme=twitter;package=com.twitter.android;end`,
          platform: 'twitter',
        };
      },
    };
    ```

2.  **Export the Handler:**
    Add your new handler to `packages/core/src/platforms/index.ts`.

3.  **Register the Handler:**
    Import and add your handler to the `handlers` array in `packages/core/src/index.ts`.

    ```typescript
    // packages/core/src/index.ts
    import {
      instagramHandler,
      linkedinHandler,
      youtubeHandler,
      twitterHandler, // Import your new handler
    } from './platforms';

    const handlers = [
      youtubeHandler,
      linkedinHandler,
      instagramHandler,
      twitterHandler, // Add it to the list
    ];
    ```

## Testing on Mobile

To verify that your deep link works correctly:

1.  **Connect to Wi-Fi:** Ensure your mobile device and computer are on the same network.
2.  **Open the Demo:** On your mobile browser, navigate to the Network URL shown in your terminal (e.g., `http://192.168.1.5:5173`).
3.  **Test Your Link:**
    - Enter a URL supported by your new handler into the input box (e.g., `https://twitter.com/elonmusk`).
    - Tap **Generate Deep Links**.
    - Tap **Open App** (this button appears after generation).
    - The app will attempt to open the native application installed on your device.
    - If the app opens, your handler is working!

## Troubleshooting

- **App doesn't open?** Check if the URI scheme (`ios`) or Intent (`android`) is correct for that specific app. These often change or require specific formats.
- **Demo not loading on mobile?** Check your computer's firewall settings to ensure port 5173 is allowed.
