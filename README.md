# Universal App Opener

A JavaScript library that converts standard HTTP URLs (YouTube, LinkedIn) into Native Mobile Deep Links (Custom Schemes & Android Intents).

## ⚠️ Development Status

**This package is currently in active development and may not work as expected.** Use at your own risk. Breaking changes may occur in future versions.

## Installation

**📦 [View on npm](https://www.npmjs.com/package/universal-app-opener)**

```bash
npm install universal-app-opener
```

```bash
pnpm add universal-app-opener
```

```bash
yarn add universal-app-opener
```

## Quick Start

```typescript
import { openLink } from 'universal-app-opener';

openLink('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
```

That's it! The library automatically detects your platform and opens the appropriate app or web URL.

## Demo

Try it out: **[Live Demo](https://mdsaban.github.io/universal-app-opener/)**

## Platform Support

### ✅ Implemented

- [x] **YouTube** - Videos (`youtube.com/watch`, `youtu.be`)
- [x] **LinkedIn** - Profiles (`linkedin.com/in/*`)

### 🚧 Coming Soon

- [ ] **Instagram** - Posts, profiles, reels
- [ ] **Twitter/X** - Tweets, profiles
- [ ] **Facebook** - Posts, profiles, pages
- [ ] **TikTok** - Videos, profiles
- [ ] **Spotify** - Songs, albums, playlists, artists
- [ ] **WhatsApp** - Chat links, group invites

## Documentation & API Reference

For full usage instructions, API details, and advanced examples, see the [Core Package README](./packages/core/README.md).

## Contributing

If you're interested in contributing in the beta phase, you can join our private Discord community: [Discord Invite](https://hub.mdsaban.com/?ref=secret)

For contribution guidelines, development workflow, and instructions to add new platforms, see [CONTRIBUTING.md](./packages/core/CONTRIBUTING.md).

## Goal

The goal of this project is to provide a lightweight, zero-dependency library that can detect platform-specific deep links from common web URLs. This enables web applications to seamlessly redirect users to native mobile apps when available, improving user experience across platforms.

## Local Setup

### Prerequisites

- Node.js >= 22.0.0
- PNPM >= 9.0.0

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd universal-app-opener
```

2. Install dependencies:

```bash
pnpm install
```

3. Start development:

```bash
pnpm dev
```

This will start:

- The core library in watch mode
- The demo app at `http://localhost:5173`

### Build

To build all packages:

```bash
pnpm build
```
