export function parseTimestampToSeconds(timestamp: string): number {
  if (!timestamp || !timestamp.trim()) {
    return 0;
  }

  const trimmed = timestamp.trim();

  if (/^\d+$/.test(trimmed)) {
    const seconds = parseInt(trimmed, 10);
    return isNaN(seconds) ? 0 : seconds;
  }

  const hoursMatch = trimmed.match(/(\d+)h/);
  const minutesMatch = trimmed.match(/(\d+)m/);
  const secondsMatch = trimmed.match(/(\d+)s/);

  if (!hoursMatch && !minutesMatch && !secondsMatch) {
    return 0;
  }

  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
  const seconds = secondsMatch ? parseInt(secondsMatch[1], 10) : 0;

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    return 0;
  }

  if (hours < 0 || minutes < 0 || seconds < 0) {
    return 0;
  }

  return hours * 3600 + minutes * 60 + seconds;
}

export const getUrlWithoutProtocol = (url: string) =>
  url.replace(/^https?:\/\//, '').replace(/^www\./, '');
