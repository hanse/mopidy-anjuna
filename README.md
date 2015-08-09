# mopidy-anjuna

> Web UI for the Mopidy Server

A web client for the mopidy server that is remarkably well suited for social events or for use in group rooms etc. With this client all songs are queued and jumping the queue is not possible by design.

Currently work in progress with some rough edges.

![Screenshot](http://i.imgur.com/67m07OR.png)

## Install
Make sure you have [mopidy](https://www.mopidy.com/) installed, then
```bash
git clone git://github.com:Hanse/mopidy-anjuna
cd mopidy-anjuna
npm install
PORT=3000 npm start
```
Running these commands should start the client on `localhost:3000`. The Mopidy server must be running on `localhost:6680`.

## License
MIT
