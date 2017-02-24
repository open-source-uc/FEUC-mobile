# FEUC Mobile

Built with [React-Native](https://facebook.github.io/react-native/).

> By [Patricio López Juri](https://lopezjuri.com).

## Requisites

* Node.js 6.9 LTS or newer
* Yarn
* XCode and Android environment

## Development

Clone this repository:

```sh
git clone https://github.com/mrpatiwi/FEUC-mobile.git
cd FEUC-mobile
```

Install dependencies:

```sh
yarn install
```

Create `.env` file for the following configuration variables:

```sh
SIGNAL_APP_ID=...
GOOGLE_MAPS_API_KEY=...
```

> This file is ignored by default on git, but it's included on the builds and can be reversed engineered.

Create development server:

```sh
yarn start
```

### iOS

Run an iOS emulator with:

```sh
yarn run ios
```

Run on device with:

```sh
yarn run ios -- --device
```

It's possible that you will need to install `ios-deploy` globally:

```sh
yarn global add ios-deploy
```

> Add the `--configuration Release` flag to run a production build.

#### Troubleshooting

Make sure to have enabled:

```diff
...
  <key>NSAppTransportSecurity</key>
  <dict>
-   <key>NSExceptionDomains</key>
-   <dict>
-     <key>localhost</key>
-     <dict>
-       <key>NSExceptionAllowsInsecureHTTPLoads</key>
-       <true/>
-     </dict>
-   </dict>
+   <key>NSAllowsArbitraryLoads</key>
+   <true/>
  </dict>
...
```

### Android

Run an Android emulator with:

```sh
yarn run android
```

#### Troubleshooting

See the console on a device with:

```sh
adb logcat *:S ReactNative:V ReactNativeJS:V
```

To show every log:

```sh
adb logcat
```
