import {jwtVerify} from "jose";
import {config} from "@/config";
import {fetcher} from "@/lib/fetcher";

export async function verifyJwtToken(token: string) {
    const secret = process.env.TOKEN_SECRET;
    if (!secret){
        throw new Error("No token secret set!");
    }

    try {
        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(secret)
        );
        return verified.payload;
    } catch (error) {
        throw new Error("Your token is expired");
    }
}
export async function refreshAccessToken(){
    try{
        await fetch(`${config.BACKEND_URL}/auth/refresh`)
    }
    catch (e) {
        throw new Error("There was an issue with refreshing the token");
    }
}

export async function logout() {
    try{
        await fetch(`${config.BACKEND_URL}/auth/logout`, {method: "POST"})
    }
    catch (e) {
        throw new Error("There was an issue with logging out");
    }
}

export async function me(invalidate = false) {
    return await fetcher.get("/auth/me");
}