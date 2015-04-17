import createActions from '../utils/createActions';
import * as MopidyService from '../services/MopidyService';

export default createActions({

  sortTracks(property) {
    return {
      sortBy: property
    };
  },

  playTrack(track, others) {
    MopidyService.playTrack(track, others);
  },

  enqueueTrack(track) {
    MopidyService.enqueueTrack(track);
  },

  clearQueue() {
    MopidyService.clearTracklist();
  }
});
