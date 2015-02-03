var covers = require('album-cover')('6cb4e4ac02504c6157f3609df73a6e0f');

var AlbumCoverActionCreators = require('../actions/AlbumCoverActions');

module.exports = {

	search(track) {
		if (!track) return;
		console.log('Searching Album Cover', track.artists[0].name, track.album.name, track);
		covers.search({
			artist: track.artists[0].name,
			album: track.album.name
		}, function(err, res) {
			if (err) return console.log(err);
			if (res === 'No image was found') res = null;
			AlbumCoverActionCreators.albumCoverReceived(res);
		});
	}
}
