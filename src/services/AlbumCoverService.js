import albumCover from 'album-cover';
import AlbumCoverActions from '../actions/AlbumCoverActions';

const covers = albumCover('6cb4e4ac02504c6157f3609df73a6e0f');

export default {

  search(track) {
    if (!track) return Promise.reject({});
    return new Promise((resolve, reject) => {
      covers.search({
        artist: track.artists[0].name,
        album: track.album.name,
        size: 'mega'
      }, function(err, res) {
        if (err || res === 'No image was found') {
          reject(res);
          return;
        }
        resolve(res);
      });
    });
  }
}
