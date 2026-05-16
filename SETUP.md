# RoadmapX Android — Setup Guide

Complete instructions for setting up the RoadmapX Capacitor Android project from scratch, building release artifacts, and preparing for Google Play Store submission.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup from Scratch](#initial-setup-from-scratch)
3. [google-services.json Setup (Firebase / Push Notifications)](#google-servicesjson-setup)
4. [Generating a Keystore for Release Signing](#generating-a-keystore-for-release-signing)
5. [Building a Debug APK](#building-a-debug-apk)
6. [Building a Release AAB for Play Store](#building-a-release-aab-for-play-store)
7. [Version Code Bump Strategy](#version-code-bump-strategy)
8. [Privacy Policy Requirement](#privacy-policy-requirement)
9. [Minimum Play Store Assets Checklist](#minimum-play-store-assets-checklist)
10. [CI/CD Setup](#cicd-setup)

---

## Prerequisites

| Tool         | Version | Install                                           |
|--------------|---------|---------------------------------------------------|
| Node.js      | 20+     | https://nodejs.org/                               |
| Java JDK     | 17      | https://adoptium.net/ (Temurin distribution)      |
| Android SDK  | API 34  | Via Android Studio or `sdkmanager`                |
| Gradle       | 8.x     | Included via `gradlew` wrapper                    |
| npm          | 10+     | Comes with Node.js                                |

Set environment variables:

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)  # macOS
export ANDROID_HOME=$HOME/Library/Android/sdk       # macOS
export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"
```

---

## Initial Setup from Scratch

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/RoadmapX-frontend.git
cd RoadmapX-frontend

# 2. Install npm dependencies
npm install

# 3. Add Android platform (if not already present)
npx cap add android

# 4. Sync web assets to the Android project
npx cap sync android

# 5. Open in Android Studio (optional, for debugging)
npx cap open android
```

If the `android/` directory already exists, skip step 3.

---

## google-services.json Setup

Push notifications and Firebase features require `google-services.json`:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or select existing one)
3. Add an Android app with package name: **`com.roadmapx.app`**
4. Download `google-services.json`
5. Place it at: **`android/app/google-services.json`**

```bash
cp ~/Downloads/google-services.json android/app/google-services.json
```

The `android/app/build.gradle` already includes logic to auto-apply the `google-services` plugin when this file is present.

> **Note:** Without this file, the build will succeed but push notifications will NOT work. You will see a log message: `google-services.json not found, google-services plugin not applied. Push Notifications won't work`

---

## Generating a Keystore for Release Signing

You need a keystore to sign release builds. **Keep this file secure and backed up — losing it means you cannot update your app on the Play Store.**

```bash
# Generate a new keystore
keytool -genkey -v \
  -keystore roadmapx.keystore \
  -alias roadmapx \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass YOUR_STORE_PASSWORD \
  -keypass YOUR_KEY_PASSWORD

# You will be prompted for:
#   - Your name, organization, city, country, etc.
#   - These are embedded in the signing certificate
```

### Place the keystore:

```bash
cp roadmapx.keystore android/app/roadmapx.keystore
```

### Configure signing in `android/app/build.gradle`:

Add the following inside the `android { }` block, **before** `buildTypes`:

```gradle
signingConfigs {
    release {
        storeFile file("roadmapx.keystore")
        storePassword System.getenv("KEYSTORE_PASSWORD") ?: ""
        keyAlias "roadmapx"
        keyPassword System.getenv("KEY_PASSWORD") ?: ""
    }
}
```

Then in the `release` buildType, add:

```gradle
buildTypes {
    release {
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        signingConfig signingConfigs.release
    }
}
```

### For CI/CD (GitHub Actions / Codemagic):

Set these as **secret environment variables**:

| Variable              | Value                                  |
|-----------------------|----------------------------------------|
| `KEYSTORE_PASSWORD`   | Your keystore password                 |
| `KEY_PASSWORD`        | Your key password (often same as above)|
| `KEY_ALIAS`           | `roadmapx`                             |
| `CM_KEYSTORE`         | Base64-encoded keystore file           |
| `CM_KEYSTORE_PASSWORD`| Your keystore password                 |
| `CM_KEY_ALIAS`        | `roadmapx`                             |
| `CM_KEY_PASSWORD`     | Your key password                      |

To base64-encode the keystore:

```bash
# macOS
base64 -i roadmapx.keystore | pbcopy

# Linux
base64 -w0 roadmapx.keystore
```

---

## Building a Debug APK

```bash
# Sync web assets first
npx cap sync android

# Build debug APK
cd android && ./gradlew assembleDebug

# The APK will be at:
# android/app/build/outputs/apk/debug/app-debug.apk
```

Install on a connected device:

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

Or use the npm script:

```bash
npm run android:build:debug
```

---

## Building a Release AAB for Play Store

```bash
# Make sure you've synced
npx cap sync android

# Build the release AAB (Android App Bundle)
cd android && ./gradlew bundleRelease

# The AAB will be at:
# android/app/build/outputs/bundle/release/app-release.aab
```

Or use the npm script:

```bash
npm run android:bundle:release
```

### Uploading to Play Store:

1. Go to [Google Play Console](https://play.google.com/console)
2. Select your app → Production → Create new release
3. Upload the `.aab` file
4. Fill in release notes
5. Review and roll out

> **First time:** You must complete the store listing, content rating, and privacy policy URL before you can publish.

---

## Version Code Bump Strategy

The version is defined in `android/app/build.gradle`:

```gradle
defaultConfig {
    applicationId "com.roadmapx.app"
    minSdkVersion rootProject.ext.minSdkVersion
    targetSdkVersion rootProject.ext.targetSdkVersion
    versionCode 1        // <-- Increment for each release
    versionName "1.0"    // <-- Human-readable version
}
```

### Rules:

| When to bump      | What to change                            |
|--------------------|-------------------------------------------|
| Every upload to Play Store | `versionCode` must be **strictly higher** than the previous upload |
| New features       | Bump `versionName` minor (e.g., 1.0 → 1.1) |
| Bug fixes          | Bump `versionName` patch (e.g., 1.0 → 1.0.1) |
| Breaking changes   | Bump `versionName` major (e.g., 1.0 → 2.0) |

### Recommended versioning:

```gradle
versionCode 2         // Increment by 1 for EVERY Play Store upload
versionName "1.1.0"   // Semantic versioning: MAJOR.MINOR.PATCH
```

> **Important:** Google Play rejects uploads if `versionCode` is not higher than the previous version. Never decrease it.

### Automation tip:

You can use a script to auto-bump:

```bash
# Bump versionCode by 1 and update versionName
cd android/app
sed -i '' 's/versionCode [0-9]*/versionCode 2/' build.gradle
sed -i '' 's/versionName "[^"]*"/versionName "1.1.0"/' build.gradle
```

---

## Privacy Policy Requirement

**Google Play requires a privacy policy URL for all apps** that request permissions or handle user data.

### RoadmapX requires a privacy policy because it uses:

- Internet access (`android.permission.INTERNET`)
- Google Sign-In (collects email, profile info)
- Push notifications (FCM uses device tokens)
- Network status monitoring

### Steps:

1. Create a privacy policy page (host it on your website or GitHub Pages)
2. Include: what data you collect, why, how you store it, user rights
3. Add the URL in two places:
   - **Google Play Console:** App content → Privacy policy → Add URL
   - **App listing:** Store presence → Store listing → Privacy policy link

### Minimum privacy policy should cover:

- Types of data collected (email, usage data, device info)
- Third-party services used (Google Sign-In, Firebase, Cloudflare Pages, Render)
- Data storage and retention practices
- User rights (access, deletion, modification)
- Contact information

> **Without a valid privacy policy URL, your app will be rejected or removed from the Play Store.**

---

## Minimum Play Store Assets Checklist

Before submitting to Google Play Console, prepare these assets:

### Required:

| Asset                          | Specification                              | Status |
|--------------------------------|--------------------------------------------|--------|
| App icon (high-res)            | 512×512 PNG, 32-bit (no alpha)             | ☐      |
| Feature graphic                | 1024×500 PNG or JPEG                       | ☐      |
| Screenshots (phone)            | Min 2, max 8; 16:9 or 9:16 aspect ratio    | ☐      |
| Screenshots (tablet 7")        | Min 2, max 8; 16:9 or 9:16 aspect ratio    | ☐      |
| Screenshots (tablet 10")       | Min 2, max 8; 16:9 or 9:16 aspect ratio    | ☐      |
| Short description              | Max 80 characters                          | ☐      |
| Full description               | Max 4000 characters                        | ☐      |
| Privacy policy URL             | Must be accessible and valid               | ☐      |
| App category                   | Education / Productivity                   | ☐      |
| Content rating questionnaire   | IARC rating completed                      | ☐      |
| Target audience & content      | Age group, contains ads, etc.              | ☐      |
| Signed AAB file                | `app-release.aab`                          | ☐      |

### Recommended:

| Asset                          | Specification                              | Status |
|--------------------------------|--------------------------------------------|--------|
| Promo graphic                  | 180×120 PNG                               | ☐      |
| TV banner                      | 1280×720 PNG                              | ☐      |
| App icon (wear OS)             | 512×512 PNG                               | ☐      |
| Video trailer                  | YouTube link, 30s–2min                    | ☐      |

---

## CI/CD Setup

### GitHub Actions

The workflow file is at `.github/workflows/build-apk.yml`.

It automatically builds on every push to `main`:
- Debug APK
- Release AAB
- Both uploaded as downloadable artifacts (7-day retention)

No additional setup needed — just push to `main`.

### Codemagic

The configuration is at `codemagic.yaml`.

Setup steps:

1. Go to [codemagic.io](https://codemagic.io/) and connect your repository
2. In Settings → Environment variables, create a group called `roadmapx_signing`
3. Add these variables:

| Variable                 | Description                          | Secure |
|--------------------------|--------------------------------------|--------|
| `CM_KEYSTORE`            | Base64-encoded keystore file         | Yes    |
| `CM_KEYSTORE_PASSWORD`   | Keystore password                    | Yes    |
| `CM_KEY_ALIAS`           | Key alias (e.g., `roadmapx`)         | No     |
| `CM_KEY_PASSWORD`        | Key password                         | Yes    |
| `GOOGLE_SERVICES_JSON`   | Base64-encoded google-services.json  | Yes    |

4. Trigger a build manually or push to `main`

---

## Quick Reference Commands

```bash
# Full build from scratch
npm install && npx cap sync android && cd android && ./gradlew assembleDebug

# Build release AAB
cd android && ./gradlew bundleRelease

# Clean build
cd android && ./gradlew clean && ./gradlew assembleDebug

# Check connected device
adb devices

# Install debug APK
adb install android/app/build/outputs/apk/debug/app-debug.apk

# View live logs
adb logcat | grep -i "roadmapx\|capacitor"

# Uninstall app
adb uninstall com.roadmapx.app
```
