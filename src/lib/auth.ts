import { config } from '@/config'
import { authFetcher, fetcher } from '@/lib/fetcher'
import { User, UserRole } from '@/typings/user'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'
import { FetchingError } from '@/lib/errors'
import Cookies from 'js-cookie'

export async function verifyJwtToken(token: string) {
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
    return await authFetcher.get('/refresh', options)
  } catch (e) {
    throw new Error('There was an issue with refreshing the token')
  }
}

export async function logout() {
  try {
    localStorage.removeItem('token')
    await authFetcher.post('/logout', {})
  } catch (e) {
    throw new Error('There was an issue with logging out')
  }
}

let cachedUser: User | null = null

export async function getMe(invalidate = false): Promise<User> {
  if (invalidate || !cachedUser) {
    const fetchedUser = await authFetcher.get('/me')
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
