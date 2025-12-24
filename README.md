# Flashiibo Pro Tools Client
A hastily made electron wrapper for [Flashiibo Pro Tools](https://app.flashiibo.com/). Made with love for those who refuse to use anything other than FireFox.

For updating the firmware of a Flashiibo Pro, you may be interested in [Flashiibo Pro Updater Client](https://github.com/cheatfreak47/flashiibo-updater).

## Requirements:
- Windows 10 or newer
- Any Bluetooth 4.0 or newer Bluetooth radio/adapter
- A Flashiibo Pro device

## How to use:
 1. Download `flashiibo-pro-tools-vXXX-setup.exe` from [Releases](https://github.com/cheatfreak47/flashiibo-client/releases).
   <sup>*(or download the portable version if you prefer)*</sup>
 2. Run installer and complete setup, and run the program. (or run the portable version.)
   <sup>*(If installed you may run it anytime from the Start Menu)*</sup>
 3. Open the User Manual page on your Flashiibo Pro, to enter Bluetooth mode.
 4. Click on "Connect" to connect to your Flashiibo Pro, and use the UI to manage device files.

## Features
- Web Bluetooth support for Flashiibo hardware
- Automatic Flashiibo Pro device selection
- Dark mode(bottom-right corner)
- Auto-matches system dark/light theme

## Build Instructions
1. Install [Node.js](https://nodejs.org/en/download)
2. Clone this repo: `git clone https://github.com/cheatfreak47/flashiibo-client.git`
3. Open cmd in the repo location and install dependencies: `npm install`.
4. Open cmd in the repo location and build: `npm run build`.
