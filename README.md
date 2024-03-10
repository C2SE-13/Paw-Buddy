# Paw-Buddy

## Description

Paw Buddy provides a comprehensive pet care platform, excluding direct services, medical interventions, and offline functionality. Its initial focus is on mobile app accessibility for individual pet owners in specific regions. The scope remains adaptable to user needs and technological advancements. This project will:

- Be a mobile app, running on the Android or iOS platform. It is built using [React native](https://reactnative.dev).

## Setup environment

### > Installing dependencies

You will need Node, the React Native command line interface, a JDK, and Android Studio.

- You can find additional installation options on [Node's Downloads page](https://nodejs.org/en/download/).

If you have already installed Node on your system, make sure it is Node 18 or newer. If you already have a JDK on your system, we recommend JDK17. You may encounter problems using higher JDK versions.

### > Android development environment

1. Install Android Studio

[Download and install Android Studio.](https://developer.android.com/studio) While on Android Studio installation wizard, make sure the boxes next to all of the following items are checked:

- Android SDK
- Android SDK Platform
- Android Virtual Device
- If you are not already using Hyper-V: Performance (Intel ® HAXM)

2. Configure the ANDROID_HOME environment variable

The React Native tools require some environment variables to be set up in order to build apps with native code.

- 1. Open the Windows Control Panel.
- 2. Click on User Accounts, then click User Accounts again
- 3. Click on Change my environment variables
- 4. Click on New... to create a new ANDROID_HOME user variable that points to the path to your Android SDK:

![](https://github.com/C2SE-13/store/blob/main/image/setup.png)

The SDK is installed, by default, at the following location:

```bash
%LOCALAPPDATA%\Android\Sdk
```

You can find the actual location of the SDK in the Android Studio "Settings" dialog, under Languages & Frameworks → Android SDK.

Open a new Command Prompt window to ensure the new environment variable is loaded before proceeding to the next step.

- 1. Open powershell
- 2. Copy and paste Get-ChildItem -Path Env:\ into powershell
- 3. Verify ANDROID_HOME has been added

3. Add platform-tools to Path

- 1. Open the Windows Control Panel.
- 2. Click on User Accounts, then click User Accounts again
- 3. Click on Change my environment variables
- 4. Select the Path variable.
- 5. Click Edit.
- 6. Click New and add the path to platform-tools to the list.

The default location for this folder is:

```bash
%LOCALAPPDATA%\Android\Sdk\platform-tools
```

## Running React Native application

### > Clone Project

Clone the repository

```bash
git clone https://github.com/C2SE-13/Paw-Buddy.git
```

Run `npm install` in the client_web(website) directory

```bash
cd Paw-Buddy
npm install
```

### > Run Project

If you use android

```bash
npm run android
```

If you use ios

```bash
npm run ios
```

## Authors (C2SE.13)

- [Phan Nhat Hoang](https://github.com/lopk11223399)
- [Nguyen Trung Hieu](https://github.com/heloqua1103)
- [Huynh Nguyen Bao Han](https://github.com/huynhbaohan02)
- [Vo Truong Dung](https://github.com/mrrobjn)
