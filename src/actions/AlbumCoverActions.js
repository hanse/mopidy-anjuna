import createActions from '../createActions';

export default createActions({

  albumCoverReceived(cover) {
    return { cover };
  }
});
