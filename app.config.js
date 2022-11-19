import 'dotenv/config';

export default {
  "expo": {
    "name": "keepsafe",
    "slug": "keepsafe",
    "scheme": "keepsafe",
    "owner": "thudf",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#292929"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#292929"
      },
      "package": "com.smartguardian.keepsafe.app",
      "versionCode": 1
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "permissions": [
      "LOCATION",
      "ACCESS_COARSE_LOCATION", 
      "ACCESS_FINE_LOCATION",
      "FOREGROUND_SERVICE"
    ],
    "extra": {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      apiUrl: process.env.API_URL,
      "eas": {
        "projectId": "c54f76e5-f45c-44a4-8d87-7766777a9fcd"
      },
    }
  }
}
