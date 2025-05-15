EventConnect
🚀 A Modern Event Management Platform
EventConnect is a sleek, intuitive platform that connects communities through events. Built with React, TypeScript, and Firebase, it allows users to discover local events, register with ease, and sync directly with their personal calendars.

✨ Features

Event Discovery: Browse through a curated list of community events
Seamless Registration: Sign up for events with a single click
Calendar Integration: Add events directly to Google Calendar
User Accounts: Track your registered events and preferences
Admin Dashboard: For organizers to create and manage events
Responsive Design: Perfect experience on any device

🛠️ Tech Stack

Frontend: React 18, TypeScript, Vite
UI Framework: Material UI
State Management: React Context API
Backend & Auth: Firebase (Authentication, Firestore)
Calendar Integration: Google Calendar API
Deployment: Netlify

🔧 Installation & Setup
Prerequisites

Node.js (v16 or later)
npm or yarn
Firebase account

Getting Started

Clone the repository

git clone https://github.com/alexizumi/event-connect.git
cd event-connect

Install dependencies

npm install

# or

yarn install

Set up environment variables

Create a .env.local file in the root directory with the following variables:
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id

You can obtain these values from your Firebase project settings.

Start the development server

npm run dev

# or

yarn dev

Open your browser

Navigate to http://localhost:5173 to see the application running.
🧪 Testing the Application
Test User Accounts
For testing purposes, you can use these pre-configured accounts:

###### MODIFY THIS

Regular User:

Email: user@example.com
Password: testuser123

Admin User:

Email: admin@example.com
Password: testadmin123

###### MODIFY THIS

Key Workflows to Test

Browse Events: Navigate to the Events page to view all upcoming events
Create an Account: Click "Sign Up" to create your own account
Register for an Event: Click on any event, then "Register" to sign up
Add to Calendar: After registering, click "Add to Calendar" to sync with Google Calendar
Admin Features: Log in with the admin account to create and manage events

🚀 Deployment
The application is deployed on Netlify(TBD) and can be accessed at eventconnect.netlify.app.
To deploy your own instance:

Build the application:

npm run build

# or

yarn build

Deploy to Netlify:
Connect your GitHub repository to Netlify
Set the build command to npm run build or yarn build
Set the publish directory to dist
Add your environment variables in the Netlify dashboard

🔍 Project Structure
event-connect/
├── public/ # Static assets
├── src/
│ ├── assets/ # Images, fonts, etc.
│ ├── components/ # Reusable UI components
│ ├── context/ # React context providers
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # Page components
│ ├── services/ # API and Firebase services
│ ├── styles/ # Global styles and themes
│ ├── utils/ # Utility functions
│ ├── App.tsx # Main application component
│ └── main.tsx # Entry point
├── .env.example # Example environment variables
├── .gitignore # Git ignore file
├── index.html # HTML template
├── package.json # Dependencies and scripts
├── tsconfig.json # TypeScript configuration
└── vite.config.ts # Vite configuration

📝 About the Developer
I'm a passionate full-stack developer with expertise in React, TypeScript, and cloud services. EventConnect showcases my ability to build intuitive, scalable applications that solve real-world problems.
I designed this platform to demonstrate:

Clean, maintainable code architecture
Modern React patterns and best practices
Seamless integration with third-party services
Thoughtful UX/UI design principles
Secure authentication and data handling

Feel free to connect with me on LinkedIn or check out my other projects on GitHub.
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

EventConnect: Bringing communities together, one event at a time.
