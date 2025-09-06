YouTube Video Player App (React Native + Expo)

Description:
A simple React Native app using Expo that fetches YouTube video IDs from a MongoDB backend, displays a scrollable list, and plays videos inside the app using WebView (YouTube embed).

Features

Scrollable video list (thumbnail, title, channel)

Tap to open video-player screen

Plays YouTube videos inside the app (no deep-linking)

Backend fetches metadata from YouTube Data API

Project Structure
youtube-client/
│
├─ app/
│  ├─ (tabs)/index.tsx       # Tab navigator (if used)
│  ├─ videoList.tsx          # Video List screen
│  └─ videoDetail/[videoId].tsx  # Video Detail screen with WebView
│
├─ screens/                  # Optional folder for screens
│
└─ package.json

Setup
1️⃣ Prerequisites

env YOUTUBE_API_KEY=AIzaSyAE2erzHC85XFsUosZx7-HDgaQKThSj4qA
MONGO_URL=mongodb+srv://charanrocky441_db_user:rocky@cluster0.dvyvxp0.mongodb.net/
PORT=5000

Node.js (>=18)

npm start backend

Expo CLI (npm install -g expo-cli)

MongoDB backend running and accessible

2️⃣ Clone & Install
git clone <your-repo-url>
cd youtube-client
npm install

3️⃣ Install Expo WebView
expo install react-native-webview

4️⃣ Start Expo
expo start
npx expo start

Opens Expo DevTools in your browser

Scan QR code with Expo Go on your phone

5️⃣ Backend URL

Make sure your backend API is running, e.g., http://192.168.0.160:5000/videos

Update the URL in videoList.tsx if necessary

6️⃣ Usage

Open app → Video List → Tap a video → Plays in WebView

7️⃣ Notes

Works only on physical devices or simulators (WebView doesn’t autoplay in browsers)

Use public YouTube videos to ensure playback
