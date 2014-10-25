var AppDispatcher = require('../AppDispatcher');
var TracklistActionTypes = require('../Constants').TracklistActionTypes;

module.exports = {

  sortBy: function(property) {
    AppDispatcher.handleViewAction({
      type: TracklistActionTypes.SORT_TRACKS,
      sortBy: property
    });
  },
};
