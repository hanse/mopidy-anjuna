import createActions from '../utils/createActions';
import AlbumCoverService from '../services/AlbumCoverService';

export default createActions({

  albumCoverReceived(cover) {
    return { cover };
  },

  lookup(track) {
    AlbumCoverService.search(track).then(cover => {
      this.albumCoverReceived(cover);
    }).catch(() => {});
  }
});
