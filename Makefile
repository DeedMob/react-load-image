node:
	babel src --out-dir lib

browser:
	babel-node ./node_modules/.bin/webpack --config ./webpack.config.js

build: node browser
