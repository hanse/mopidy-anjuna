module.exports = {

  convertTime: function(ms) {
    return [
      //((ms/(1000*60*60)) % 24) >> 0,
      ((ms/(1000*60)) % 60) >> 0,
      ((ms/1000) % 60) >> 0
    ].map(function(c) {
      return c < 10 ? '0' + c : c;
    }).join(':');
  },

  artistsAsString: function(track) {
    return (track.artists || []).map(function(artist) {
      return artist.name;
    }).join(', ');
  }
};
