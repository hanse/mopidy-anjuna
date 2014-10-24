![Asamoah](http://f.cl.ly/items/072x3T3D1O0e1K1F051c/Asamoah.png)

> Opinionated frontend setup for Browserify, stylus, nib and GNU Make.

An opinionated setup for frontend development using [Browserify](http://browserify.org/), [React](http://facebook.github.io/react/), [stylus](http://learnboost.github.io/stylus/), [nib](https://github.com/visionmedia/nib), [GNU Make](http://www.gnu.org/software/make/) and [git](http://git-scm.com/).

## Getting Started
You will need to have [node.js](http://nodejs.org/) and [npm](https://www.npmjs.org/) installed. In addition, you should have python available for the development server.
```bash
$ git clone https://github.com/Hanse/asamoah
$ cd asamoah
$ rm -rf .git
$ git init
$ git add .
$ git commit -m "Initial commit"
$ npm install
```

Build the JS and CSS files by running
```bash
$ make
```

Try it in your browser
```bash
$ PORT=2345 make server
-> Server running on localhost:2345
```

## Directory structure
All uncompiled JS and CSS/Stylus assets reside in the `assets/` directory. They are by default compiled into `public/app.js` and `public/app.css` respectively. This can be changed in the `Makefile`. Having compiled files in the public directory makes it trivial to serve this folder from [nginx](http://nginx.org/) without serving the source files for example.

## Re-running `make`
It can be cumbersome to run `make` for every change. A way to solve this is to use [visionmedia/watch](https://github.com/visionmedia/watch) for periodical runs combined with [something](https://github.com/ddollar/foreman) [that can](https://github.com/ddollar/forego) [run a](https://github.com/hecticjeff/shoreman) `Procfile`. Having these installed, you can run:

```bash
$ make watch
```

The `Procfile` solution is used to easily capture output from both `watchify` and the css watch stuff at the same time.

## Compress JS and CSS files
JS and CSS files are by default compressed when `NODE_ENV` is set to something other than `development`.

```bash
$ NODE_ENV=production make
```

## License
MIT
