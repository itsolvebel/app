export const production = process.env.NODE_ENV === 'production'

export const config = {
  FRONTEND_URL: 'https://itsolveweb.vercel.app/',
  VERSION: production ? '1.0.0' : '1.0.0-beta',
  BACKEND_URL: production
    ? 'https://itsolve.1.ie-1.fl0.io'
    : 'https://itsolve.1.ie-1.fl0.io',
}
