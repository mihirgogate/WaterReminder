clean:
	rm -rf node_modules
	rm -rf WaterReminder-darwin-x64/

bootstrap:
	npm install
	npm build

test:
	node *test.js

start:
	npm start

build:
	npm run build
