import { ENV } from "@/constants/Environment";
import { authorize, AuthorizeResult } from "react-native-app-auth";

// base config
const OAUTH_CONFIG_STRAVA = {
  clientId: ENV.OAUTH.STRAVA.CLIENT_ID,
  clientSecret: ENV.OAUTH.STRAVA.CLIENT_SECRET,
  redirectUrl: ENV.OAUTH.STRAVA.REDIRECT_URL,
  serviceConfiguration: {
    authorizationEndpoint: "https://www.strava.com/oauth/mobile/authorize",
    tokenEndpoint: `https://www.strava.com/oauth/token?client_id=${ENV.OAUTH.STRAVA.CLIENT_ID}&client_secret=${ENV.OAUTH.STRAVA.CLIENT_SECRET}`,
  },
  scopes: ["activity:read_all"],
};

export interface Athlete {
  badge_type_id: number;
  bio: string | null;
  city: string | null;
  country: string | null;
  created_at: string;
  firstname: string;
  follower: string | null;
  friend: string | null;
  id: number;
  lastname: string;
  premium: boolean;
  profile: string | null;
  profile_medium: string | null;
  resource_state: number;
  sex: string | null;
  state: string | null;
  summit: boolean;
  updated_at: string;
  username: string | null;
  weight: string | null;
}

const authorizeStrava = async () => await authorize(OAUTH_CONFIG_STRAVA);

export { authorizeStrava };
