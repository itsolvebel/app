export const production = process.env.NODE_ENV === "production";

export const config = {
  FRONTEND_URL: "https://itsolveweb.vercel.app/",
  VERSION: production ? "1.0.0" : "1.0.0-beta",
  // BACKEND_URL: production
  //   ? "https://itsolve-prod.1.ie-1.fl0.io/api/v1"
  //   : "https://itsolve-prod.1.ie-1.fl0.io/api/v1",
  WEBSOCKET_URL: "ws://itsolve-prod.1.ie-1.fl0.io/ws",
  BACKEND_URL: "http://localhost:3001/api/v1",
};  
