# Voice-to-Text React Native App

## Overview

This is a **React Native** application that converts **voice input into text** using speech recognition. The app utilizes the `@react-native-voice/voice` package to capture and transcribe speech in real-time.

## Features

- Start and stop voice recording
- Convert speech to text
- Display transcribed text in real-time
- Support for multiple languages (if applicable)

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (Latest LTS version recommended)
- React Native CLI
- Android Studio / Xcode (For running on emulator or physical device)

### Clone the Repository

```sh
git clone https://github.com/sunilkumawat6268/react-native-voice-to-text.git
cd react-native-voice-to-text
```

### Install Dependencies

```sh
yarn install
# OR
npm install
```

## Setup

### Link the Voice Package (If Required)

For React Native 0.60 and above, autolinking should handle this. Otherwise, manually link it:

```sh
npx react-native link @react-native-voice/voice
```

### iOS Setup

If you are using iOS, ensure you install pods:

```sh
cd ios && pod install && cd ..
```

Additionally, add the following permission in `Info.plist`:

```xml
<key>NSSpeechRecognitionUsageDescription</key>
<string>We need access to your microphone for speech recognition.</string>
<key>NSMicrophoneUsageDescription</key>
<string>We need microphone access to capture your voice.</string>
```

### Android Setup

Add the following permissions to `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
```

## Running the App

### For Android

```sh
npx react-native run-android
```

### For iOS

```sh
npx react-native run-ios
```

## Usage

1. Open the app.
2. Press the **Start Recording** button to begin voice capture.
3. Speak into the microphone.
4. The transcribed text will appear on the screen.
5. Press **Stop Recording** to end voice input.

## Dependencies

- `@react-native-voice/voice`
- `react-native` (Latest version)
- `react-native-permissions` (For handling permissions, if needed)

## License

This project is open-source and available under the **MIT License**.

---


