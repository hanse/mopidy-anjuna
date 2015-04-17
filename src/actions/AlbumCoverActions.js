import createActions from '../utils/createActions';

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
