# 🎨 Skimble

A real-time collaborative whiteboard and idea canvas powered by React, Node.js, and AWS. Skimble is where creativity meets connectivity—built for teams, students, and creators to sketch, share, and sync ideas instantly from anywhere.

---

## 📌 Features

- ⚡ Real-time multi-user sketching and note-taking
- 📝 Drawing tools, sticky notes, text elements
- 🔐 Secure authentication via AWS Cognito
- ☁️ Persistent storage using AWS DynamoDB and S3
- 🗂 Version history and rollback
- 💬 In-app commenting/chat
- 📤 Export whiteboards to image or PDF
- 📱 Fully responsive, mobile-friendly interface

---

## 🛠 Tech Stack

| Layer             | Technology                      |
|------------------|----------------------------------|
| Frontend         | React.js, React Router           |
| Backend          | Node.js, Express.js              |
| Authentication   | AWS Cognito                      |
| Real-Time Sync   | WebSockets or AWS AppSync        |
| Storage          | AWS DynamoDB / Aurora, S3        |
| Hosting          | AWS Amplify / CloudFront + S3    |

---

## 🔧 Setup Instructions

### 1. Clone the Repository


```bash
git clone https://github.com/your-username/skimble.git
cd skimble
```

### 2. Install Frontend

```bash
cd client
npm install
npm start

```

### 3. Install Backend

```bash
cd ../server
npm install
npm run dev
```

### ☁️4. AWS Setup

1. Create a Cognito User Pool and App Client for Auth
2. Set up an S3 bucket with public access & CORS
3. Set up DynamoDB or Aurora for board data
4. Assign appropriate IAM roles for Lambda/API Gateway (if applicable)
---

### 🔐 5.  Authentication Flow

1. User signs up/logs in through Cognito Hosted UI
2. Cognito returns JWT tokens (access + ID)
3. Frontend stores and attaches the JWT to outgoing API requests
4. Backend verifies token on each request
---
### 🔄 6. Real-Time Collaboration Logic

1. Each whiteboard session has a unique board ID
2. Clients connect to a WebSocket channel or AppSync subscription for that board
3. Changes made by one user are broadcast to all connected users
4. Periodic autosaves send changes to the cloud database
---
### 📡 7. API Endpoint
```bash
POST    /api/boards          → Save a new board  
GET     /api/boards/:id      → Retrieve an existing board  
PUT     /api/boards/:id      → Update board content  
DELETE  /api/boards/:id      → Delete a board
```
---
### 📁 8. Folder Structure

```bash
skimble/
├── client/                 # React frontend
│   ├── src/
│   └── public/
├── server/                 # Node.js backend
│   ├── routes/
│   ├── controllers/
│   └── .env
├── .env
└── README.md
```
---
### 🌱 Future Enhancement 

- Voice notes and audio sketches  
- AI-enhanced auto-layout and shape recognition  
- Offline mode with sync-on-reconnect  
- Theme support (dark/light/custom)  
- Templates for flowcharts, diagrams, storyboarding  
---
### 👤 Author   

Created by Hari  
MIT License © 2025  
