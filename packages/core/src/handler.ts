import { Platform } from './types';

export interface ParsedPayload {
    [key: string]: any;
}

export interface AppHandler {

    // The platform identifier (e.g., 'youtube', 'linkedin')

    platform: Platform;


    // Optional priority for the handler. Higher numbers are matched first.
    // Defaults to 0.

    priority?: number;


    // Checks if the URL is supported by this handler.Should be fast and synchronous.

    match(url: string): boolean;


    // Parses the URL into a structured payload. Returns null if parsing fails.

    parse(url: string): ParsedPayload | null;


    //  Builds a deep link or web URL for the specified OS.
    buildLink(payload: ParsedPayload, os: 'ios' | 'android' | 'web'): string;
}
