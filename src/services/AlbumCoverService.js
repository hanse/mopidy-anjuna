import albumCover from 'album-cover';

const covers = albumCover('6cb4e4ac02504c6157f3609df73a6e0f');

export function search(track) {
  return new Promise((resolve, reject) => {
    if (!track) {
      reject();
    }

    covers.search({
      artist: track.artists[0].name,
      album: track.album.name,
      size: 'mega'
    }, (err, res) => {
      if (err || res === 'No image was found') {
        return reject(res);
      }
      resolve(res);
    });
  });
}
