# Lunar Rockets Dashboard (Frontend)

This is the **React + Vite** dashboard for the Lunar Rockets project.  
It visualizes rocket telemetry processed by the backend API.

---

## Tech Stack
- **React 18**
- **Vite** (fast dev server & bundler)
- **Axios / Fetch API** (REST communication)
- **Docker** for containerized deployment

## ▶How to Run Locally

### 1. Install dependencies
```bash
npm install
npm run dev
```

Frontend will be available at http://localhost:5173
Make sure the backend is running at http://localhost:8088 (inmemory or redis).

### 2. Run with docker
```
docker build -t rockets-frontend .
docker run -d -p 8081:80 rockets-frontend
```

Frontend will be available at http://localhost:8081.
It will connect to backend API at http://localhost:8088.