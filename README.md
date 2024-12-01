## Setup

### Prerequisites

Ensure the have the following requirements:

- Node.js and npm
- Expo CLI
- Strava Developer App and credentials

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# General configuration
API_BASE_URL=<your-api-base-url>
STRAVA_CLIENT_ID=<your-strava-client-id>
STRAVA_CLIENT_SECRET=<your-strava-client-secret>
STRAVA_REDIRECT_URI=<your-strava-redirect-uri>
```

---

## Authentication

This project uses [React Native App Auth](https://commerce.nearform.com/open-source/react-native-app-auth/docs/providers/strava) for Strava authentication. Ensure your Strava Developer App is set up and configured properly.

---

## How to Start

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd <project-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the `.env` file with the required variables.

4. Start the application:
   - For iOS:
     ```bash
     npx react-native run-ios
     ```
   - For Android:
     ```bash
     npx react-native run-android
     ```

---

## Out of Scope

The following features were not included for the assignment:

- **Password Reset Functionality**.
- **Social Logins**: Authentication via popular social platforms.
- **Session Persistence**: Ensure users remained logged in across app restarts.
- **Support for All Activity Types**: Extend functionality to accommodate all activity types in strava (e.g., hikes, swims, bike rides, etc.).
