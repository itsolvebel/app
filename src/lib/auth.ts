import {jwtVerify} from "jose";
import {config} from "@/config";
import {fetcher} from "@/lib/fetcher";
import {UserRole} from "@/typings/user";

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

export async function getMe(invalidate = false) {
    return await fetcher.get("/auth/me");
}

export type GetUserRolesData = {
    roles: UserRole[];
    isAdmin: boolean;
    isFreelancer: boolean;
    isUser: boolean;
    isTm: boolean;
    isSalesRep: boolean;
};

export async function getUserRoles(invalidate = false): Promise<GetUserRolesData> {
    const data = await fetcher.get("/user/roles");
    const roles: UserRole[] = data.user.roles || [];

    return {
        roles,
        isAdmin: roles.includes(UserRole.Admin),
        isFreelancer: roles.includes(UserRole.Freelancer),
        isUser: roles.includes(UserRole.User),
        isTm: roles.includes(UserRole.Tm),
        isSalesRep: roles.includes(UserRole.SalesRep),
    };
}