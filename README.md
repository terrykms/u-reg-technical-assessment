# U-Reg Technical Assessment

This is a full-stack application built with

- **React** (with [Vite](https://vitejs.dev)) for the front-end
- **Express.js** (Node.js) for the back-end

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

## Setting up the Application

### 1. Clone the repo

```bash
git clone https://github.com/terrykms/u-reg-technical-assessment.git
cd u-reg-technical-assessment
```

### 2. Install dependencies

**Backend (Express)**

```bash
cd server
npm install
```

**Frontend (React)**

```bash
cd ../client
npm install
```

### 3. Set up Environment Variables

**Backend (server/.env)**

```ini
PORT=3000
OPENSANCTIONS_API_KEY=your-api-key-here
```

**Frontend (client/.env)**

```ini
VITE_DEVELOPMENT_SERVER_URL=http://localhost:3000
```

### 4. Run the app

**Start the backend**

```bash
cd server && npm run dev
```

**Start the frontend**

```bash
cd ../client && npm run dev
```

The app should now be running at:

- Frontend → http://localhost:5173
- Backend API → http://localhost:3000
