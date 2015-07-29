export function convertTime(ms) {
  return [
    ((ms / (1000 * 60)) % 60) | 0,
    ((ms / 1000) % 60) | 0
  ].map(c => c < 10 ? '0' + c : c)
   .join(':');
}

export function formatArtists(artists) {
  if (!artists) return '';
  return artists.map(artist => artist.name).join(', ');
}
