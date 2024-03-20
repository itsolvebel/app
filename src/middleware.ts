import { NextRequest, NextResponse } from 'next/server'
import { refreshAccessToken, verifyJwtToken } from '@/lib/auth'
import { config as configuration } from '@/config'

const PUBLIC_ROUTES = ['/login', '/register']

export async function middleware(req: NextRequest) {

  if (PUBLIC_ROUTES.some(route => req.nextUrl.pathname.startsWith(route))) {
    return null;
  }
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const verifiedAccessToken = accessToken && await verifyJwtToken(accessToken).catch((err) => {
    console.error(err);
    return;
  });
  const verifiedRefreshToken = refreshToken && await verifyJwtToken(refreshToken).catch((err) => {
    console.error(err);
    return;
  });

  if (!verifiedAccessToken && !verifiedRefreshToken) {
    return NextResponse.redirect(new URL(`${configuration.AUTH_URL}?redirect=${req.url.replace('http://', '').replace('https://', '')}`));
  }
  // Access token revoked but refresh token ok, so get a new access token before continuing.
  if (!verifiedAccessToken && verifiedRefreshToken) {
    try {
      await refreshAccessToken();
    } catch {
      return NextResponse.redirect(new URL(`${configuration.AUTH_URL}?redirect=${req.url.replace('http://', '').replace('https://', '')}`));
    }
    return;
  }
}

// export async function middleware(req: NextRequest) {
//
//   if (PUBLIC_ROUTES.some(route => req.nextUrl.pathname.startsWith(route))) {
//     return null
//   }
//   const accessToken = req.cookies.get('token')?.value
//   const verifiedAccessToken = accessToken && await verifyJwtToken(accessToken).catch((err) => {
//     console.error(err)
//     return
//   })
//
//
//   if (!verifiedAccessToken) {
//     return NextResponse.redirect(new URL('/login', req.url))
//   }
// }

export const config = { matcher: '/((?!.*\\.).*)' }
