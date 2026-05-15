import 'dotenv/config';

export default {
  expo: {
    scheme: "habittracker",
    name: "habit-tracker-frontend",
    slug: "habit-tracker-frontend",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.dobrev.habittracker",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: ["expo-router"],
    extra: {
      apiUrl: process.env.API_URL,
      eas: {
        projectId: "da2ab943-e04b-4669-997f-fceaf704a060",
      },
    },
  },
};
