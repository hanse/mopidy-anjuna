import albumCover from 'album-cover';
import AlbumCoverActions from '../actions/AlbumCoverActions';

var covers = albumCover('6cb4e4ac02504c6157f3609df73a6e0f');

export default {

  search(track) {
    if (!track) return;
    covers.search({
      artist: track.artists[0].name,
      album: track.album.name,
      size: 'mega'
    }, function(err, res) {
      if (err) return console.log(err);
      if (res === 'No image was found') res = null;
      AlbumCoverActions.albumCoverReceived(res);
    });
  }
}
