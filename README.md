# Electron Music Box App

![Screenshot of the Electron application.](https://raw.githubusercontent.com/IainIsCreative/electron-music-box/develop/static/images/screenshot.jpg)

A fun little prototype that plays music on a Piezo controlled by Electron. It's a small experiment in using Electron
for building a desktop application to control an Arduino. This is also my first real attempt at making an Electron app.

## Structure

This application uses a specific structure for the project. This is also a demonstration in fragmentation, in separating the application, the UI, and the Robot.

```
project
  ├─-app
  |   └--index.js
  ├─-dist
  |   └ All processed files i.e. style.css go here
  ├--static
  |   ├--images
  |   ├--scss
  |   ├--svgs
  |   └--Anything that is a visual, static asset goes in this directory
  ├--.gitignore
  ├--config.js
  ├--gulpfile.js
  ├--index.html
  ├--LICENSE
  ├--main.js
  ├--package.json
  ├--README
  └--robot.js
```

At the base of the project, there's specific files like `config.js`, which set up the robot (or rather, server) and its address and port for the app to call back to. `main.js` is the file that is used to run our Electron app, using `index.html` as the app's front end, and `app/index.js` being the front end's JavaScript that interacts with our robot.

`robot.js` is a seperate file, that contains all the code for the Arduino. It is set up as an Express server, which runs under the address and port that's specified in `config.js`, along with websockets. The App's front end uses the same configuration to connect to the appropriate sockets and send commands to our robot.

This project also makes us of Gulp, but just for building the front end's stylesheet.

## Circuit

The circuit for this is super simple, as it's only a buzzer that's required, and a microcontroller.

### List of Components

* Arduino Uno (or any Arduino, for that matter. This will work with any of them.)
* 1 Piezo Buzzer
* 2 Jumper Cables

That's...pretty much it really.

### Diagram

Again, this is simply connecting a buzzer to the Arduino. All easy stuff!

![Fritzieg Diagram of the Music Box.](https://raw.githubusercontent.com/IainIsCreative/electron-music-box/develop/static/images/piezo-circuit.jpg)

## Installing

You can use Yarn or NPM to install the packages and run the project, though I recommend Yarn as it's very quick and easy to use.

To install, simply clone this project, and run `yarn install` or `npm install` to install the necessary packages.

## Commands

There is a set of commands you can use to run this project. Again, you can use `yarn` or `npm` to run these commands.

### List of Commands

* `start` — Build the Styles (via Gulp) then launch the Electron App
* `robot` — Start the `robot.js` file (Note: This is necessary for the app to connect to!)
* `styles` — Build the app's Stylesheet.
* `styles-watch` — Build the app's stylesheet and continue to watch the SCSS files for any changes.

## Credits

This project uses [j5-songs](https://github.com/julianduque/j5-songs) for the music that plays on the Piezo. j5-songs is a Johnny-Five library by [Julian Duque](https://twitter.com/julian_duque).

## About The Author

[Iain](https://twitter.com/IainIsCreative) is a developer, designer, and artist with Asperger's Syndrome who makes things and has a fascination with all things creative. He likes to experiment with code, boards, and digital art.

### Support the author!

[Follow on Twitter](https://twitter.com/IainIsCreative), [like on Facebook](https://facebook.com/IainIsCreative), and pledge to Iain [on Patreon!](https://patreon.com/IainIsCreative)
