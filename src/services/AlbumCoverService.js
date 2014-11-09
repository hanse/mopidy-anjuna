var covers = require('album-cover')('6cb4e4ac02504c6157f3609df73a6e0f');

var AlbumCoverActionCreators = require('../actions/AlbumCoverActionCreators');

module.exports = {
	search: function(track) {
		console.log('Searching', track.artists[0].name, track.album.name);
		covers.search({
			artist: track.artists[0].name,
			album: track.album.name
		}, function(err, res) {
			if (err) return console.log(err);
			AlbumCoverActionCreators.receiveAlbumCover(res);
		});
	}
}