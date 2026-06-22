# Habiko — Habit Tracker Frontend

Mobile frontend for the Habiko habit tracking application.
Built with React Native and Expo. Connects to a live REST API
backend with HTTPS and JWT authentication.

## Tech Stack

- **Framework:** React Native (Expo)
- **Language:** JavaScript
- **Navigation:** Expo Router (file-based routing)
- **State Management:** React Context API
- **HTTP Client:** Fetch API

## Features

- User registration and login
- JWT authentication with persistent sessions
- View, create, and delete habits
- Track daily habit completion
- Protected routes — unauthenticated users redirected to login
- Clean tab-based navigation

## Screens

- **Login** — authenticate with email and password
- **Register** — create a new account
- **Habits** — view all your habits, delete existing ones
- **Create** — add a new habit
- **Profile** — view account info and logout

## Getting Started

### Prerequisites
- Node.js
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (for testing)

### Setup

1. Clone the repository
```bash
git clone https://github.com/http-dobrev/habit-tracker-frontend.git
cd habit-tracker-frontend
```

2. Install dependencies
```bash
npm install
```

3. Configure the API URL in `app.config.js`
```javascript
extra: {
  apiUrl: "https://your-api-domain.com"
}
```

4. Start the development server
```bash
npx expo start
```

Scan the QR code with Expo Go on your phone to run the app.

## Project Structure

```
app/
├── (auth)/
│   ├── _layout.jsx       # Auth layout
│   ├── login.jsx         # Login screen
│   └── register.jsx      # Register screen
└── (dashboard)/
├── _layout.jsx       # Dashboard layout with tabs
├── habits.jsx        # View and delete habits
├── create.jsx        # Create a new habit
└── profile.jsx       # Account info and logout
components/
├── auth/                 # Auth guard components
└── ...                   # Shared UI components
contexts/
├── UserContext.jsx       # Authentication state
└── HabitContext.jsx      # Habits state
hooks/
├── useUser.jsx           # User context hook
└── useHabits.jsx         # Habits context hook
lib/
└── api.js                # All API calls to backend
constants/
└── Colors.js             # App theme colors
```
## Related

- Backend repository: [habit-tracker-backend](https://github.com/http-dobrev/habit-tracker-backend)
