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
	@echo "Now run 'make desktop' to add a shortcut on your desktop"

application:
	rm -rf /Applications/WaterReminder.app
	mv -f WaterReminder-darwin-x64/WaterReminder.app /Applications
	@echo "Added to Applications! Enjoy!"
