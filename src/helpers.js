export function convertTime(ms) {
  return [
    ((ms / (1000 * 60)) % 60) | 0,
    ((ms / 1000) % 60) | 0
  ].map(c => c < 10 ? '0' + c : c)
   .join(':');
}

export function artistsAsString(track) {
  return (track.artists || [])
    .map(artist => artist.name)
    .join(', ');
}
