export const ENV = {
  OAUTH: {
    STRAVA: {
      CLIENT_ID: process.env.EXPO_PUBLIC_OAUTH_STRAVA_CLIENT_ID ?? "",
      CLIENT_SECRET: process.env.EXPO_PUBLIC_OAUTH_STRAVA_CLIENT_SECRET ?? "",
      REDIRECT_URL: process.env.EXPO_PUBLIC_OAUTH_STRAVA_REDIRECT_URL ?? "",
    },
  },
};
