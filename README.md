# SubLet Super-App

A React Native/Expo app for property listings and services in Saudi Arabia.

## Features
- Property listings with search and filters
- Service bookings (photography, chefs, meals, etc.)
- User profiles with wallet balance
- Dark mode support
- Bilingual support (EN/AR)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Firebase Setup:
- Create a new Firebase project at https://console.firebase.google.com
- Enable Authentication, Firestore, and Storage
- Copy your Firebase config from the console
- Create a `.env` file based on `.env.example` and fill in your Firebase config

3. Initialize Firebase:
```bash
npm install -g firebase-tools
firebase login
firebase use --add
```

4. Deploy Firestore rules and indexes:
```bash
firebase deploy --only firestore:rules,firestore:indexes
```

5. Deploy Cloud Functions (optional):
```bash
cd functions
npm install
npm run deploy
```

6. Seed the database:
```bash
npm run seed:local
```

7. Start the app:
```bash
npm start
```

## Development

- The app uses TypeScript for type safety
- Firebase is used for backend services
- Cloud Functions handle wallet transactions and notifications
- Firestore security rules protect data access
- Storage rules manage listing images

## Environment Variables

Create a `.env` file with the following variables:
```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

## Testing

```bash
npm test
```

## License

MIT 