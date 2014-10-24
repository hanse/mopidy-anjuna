
#
# Executables and paths
#

STYLUS     = node_modules/.bin/stylus
UGLIFY     = node_modules/.bin/uglifyjs
BROWSERIFY = node_modules/.bin/browserify
WATCHIFY   = node_modules/.bin/watchify
NIB        = node_modules/nib/lib

#
# The dev server PORT
#

PORT ?= 3000

#
# The main CSS and JS files
#

CSS_MAIN   = assets/stylesheets/style.styl
JS_MAIN    = src/index.js

#
# All CSS and JS files (used for file watching)
#

CSS        = $(shell find assets/stylesheets -name "*.styl")
JS         = $(shell find src -name "*.js")

#
# Compiled CSS and JS Files
#

BUILD_CSS  = public/app.css
BUILD_JS   = public/app.js

#
# Browserify Transforms
# See https://github.com/substack/node-browserify/wiki/list-of-transforms
#

TRANSFORMS = -t [reactify --harmony]

#
# Default task
#

all: $(BUILD_CSS) $(BUILD_JS)

#
# Build CSS files
#

$(BUILD_CSS): $(CSS)
ifneq ($(NODE_ENV), development)
	$(STYLUS) --include $(NIB) --compress < $(CSS_MAIN) > $(BUILD_CSS)
else
	$(STYLUS) --include $(NIB) < $(CSS_MAIN) > $(BUILD_CSS)
endif

#
# Build JavaScript files
#

$(BUILD_JS): $(JS)
ifneq ($(NODE_ENV), development)
	$(BROWSERIFY) $(TRANSFORMS) $(JS_MAIN) | $(UGLIFY) > $(BUILD_JS)
else
	$(BROWSERIFY) $(TRANSFORMS) $(JS_MAIN) > $(BUILD_JS)
endif


watch-js:
	$(WATCHIFY) $(TRANSFORMS) $(JS_MAIN) -v -o $(BUILD_JS)

watch-css: $(BUILD_CSS)
	@true

watch:
	@foreman start

node_modules: package.json
	@npm install

#
# Start a local dev server listening on PORT
#

server:
	@echo "-> Server running on $(PORT)"
	@cd public && python -m SimpleHTTPServer $(PORT)

#
# Remove build files
#

clean:
	rm -f $(BUILD_CSS) $(BUILD_JS)

#
# Non-files are PHONY targets
#

.PHONY: clean server
