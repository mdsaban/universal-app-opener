import { Platform } from '../types';

export type PlatformLink = {
  name: string;
  url: string;
  webUrl: string;
  ios: string | null;
  android: string | null;
};

export type SocialLinks = Record<Platform, PlatformLink[]>;
