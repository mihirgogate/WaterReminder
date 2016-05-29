# WaterReminder

Reminds you to drink water by blinking an icon in the Mac OS X menu bar every 1 hour. Once you have had a glass of water, click on the icon, click on "Drank!" and it should stop the blinking for another hour.

Stay Healthy!


### To run

Run the following commands in a terminal

```bash
cd ~
git clone https://github.com/mihirgogate/WaterReminder.git
cd WaterReminder
make bootstrap
make build
make application
```

This creates WaterReminder as a Mac OS X application.
To run it you can either
- Open up Spotlight(Cmd + Space)  and type "WaterReminder" and hit Enter.
- Open up the Mac Finder, click on Applications and then click on the WaterReminder app.
- Open up a terminal and type `open /Applications/WaterReminder.app/`
