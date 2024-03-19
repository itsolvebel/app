export const production = process.env.NODE_ENV === 'production'

export const config = {
  FRONTEND_URL: 'https://app.itsolve.be/',
  VERSION: production ? '1.0.0' : '1.0.0-beta',
  WEBSOCKET_URL: 'wss://gateway.itsolve.be',
  BACKEND_URL: 'https://services-api.itsolve.be/v1',
  AUTH_URL: 'https://auth.itsolve.be',
  MESSAGES_PER_PAGE: 50,
}
