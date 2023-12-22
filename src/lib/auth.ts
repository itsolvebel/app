import { config } from '@/config'
import { fetcher } from '@/lib/fetcher'
import { User, UserRole } from '@/typings/user'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'
import { FetchingError } from '@/lib/errors'
import Cookies from 'js-cookie'

export async function verifyJwtToken(token: string) {
  // const secret = process.env.TOKEN_SECRET
  // if (!secret) {
  //   console.error('No token secret set!')
  //   throw new Error('No token secret set!')
  // }
  // try {
  //   const verified = await jwtVerify(
  //     token,
  //     new TextEncoder().encode(secret),
  //   )
  //   return verified.payload
  // } catch (error) {
  //   throw new Error('Your token is expired')
  // }
  const user = jwtDecode(token)
  const isExpired = dayjs.unix(user.exp ?? 0).diff(dayjs()) < 1
  return !isExpired
}

export async function refreshAccessToken() {
  const options: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    return await fetch(`${config.BACKEND_URL}/auth/refresh`, options)
  } catch (e) {
    throw new Error('There was an issue with refreshing the token')
  }
}

export async function logout() {
  try {
    Cookies.remove('token') //TODO remove this when auth fixed
    localStorage.removeItem('token')
    await fetcher.post('/auth/logout', {})
  } catch (e) {
    throw new Error('There was an issue with logging out')
  }
}


export type LoginBody = {
  email_or_username: string,
  password: string
}

export type RegisterBody = {
  username: string
  first_name: string
  last_name: string
  email: string
  password: string
}

export async function login(body: LoginBody) {
  const options: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  return await fetcher.post('auth/login', body, options)
}

export async function register(body: RegisterBody) {
  console.log(body)
  const options: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  return await fetcher.post('auth/signup', body, options)
}


let cachedUser: User | null = null

export async function getMe(invalidate = false): Promise<User> {
  if (invalidate || !cachedUser) {
    const fetchedUser = await fetcher.get('/auth/me')
    cachedUser = fetchedUser.data as User
  }
  return cachedUser
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
  try {
    const data = cachedUser || await getMe()

    const roles: UserRole[] = data.roles || []

    return {
      roles,
      isAdmin: roles.includes('Admin'),
      isFreelancer: roles.includes('Freelancer'),
      isUser: roles.includes('User'),
      isTm: roles.includes('Tm'),
      isSalesRep: roles.includes('SalesRep'),
    }
  } catch (e) {
    throw e as FetchingError
  }
}
