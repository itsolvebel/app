import {NextRequest, NextResponse} from "next/server";
import {refreshAccessToken, verifyJwtToken} from "@/lib/auth";

export async function middleware(req: NextRequest) {

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
        return NextResponse.redirect(new URL("/login", req.url));
    }
    // Access token revoked but refresh token ok, so get a new access token before continuing.
    if (!verifiedAccessToken && verifiedRefreshToken) {
        await refreshAccessToken();
        return;
    }
    const redirectUrls = [
        "/login", "/register"
    ]
    if (verifiedAccessToken && verifiedRefreshToken) {
        if (redirectUrls.some(url => req.nextUrl.pathname.startsWith(url))) {
            NextResponse.redirect(new URL("/", req.url));
        }
    }
}