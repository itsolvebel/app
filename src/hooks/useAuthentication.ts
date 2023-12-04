// import { useCallback } from 'react'
//
// import { AxiosError } from 'axios'
// import { CredentialHeaders, useDelete, usePost, usePut, useRequest } from '@/hooks/useRequest'
// import { config } from '@/config'
// import { useRouter } from 'next/navigation'
// import {User} from "@/typings/user";
//
//
// // export const useIsAuthenticated = () => {
// //   const { data, loading } = useRequest<User>('GET', '/api/auth/me')
// //
// //   return { isAuthenticated: !!data, loading }
// // }
//
// export const useLogin = (onError?: (error: AxiosError) => void) => {
//   const router = useRouter()
//   const { loading, request } = usePost('/api/auth/login', {
//     onError,
//     onComplete: () => {
//       router.push('/')
//     },
//   })
//
//   const login = (creds: { email: string; password: string }) => {
//     request(creds)
//   }
//
//   return { login, loading }
// }
//
// export const useLogout = () => {
//   const router = useRouter()
//
//   const logout = useCallback(
//     () => {
//       router.push('/login')
//     },
//     [router],
//   )
//   return { logout }
// }
//
// export const useSignup = (onError?: (error: AxiosError) => void) => {
//   const router = useRouter()
//   const { loading, request } = usePost('/api/auth/signup', {
//     onError,
//     onComplete: () => {
//       router.push('/')
//     },
//   })
//
//   const register = (registerFields: {
//     first_name: string
//     last_name: string
//     email: string
//     password: string
//     password_confirmation: string
//   }) => request(registerFields)
//
//   return { register, loading }
// }
//
// export const useDeleteAccount = (onError?: (error: AxiosError) => void) => {
//   const { logout } = useLogout()
//   const { request } = useDelete('/api/users', {
//     onError,
//     onComplete: () => logout(),
//   })
//
//   const deleteAccount = () => request()
//   return { deleteAccount }
// }
//
// export const useChangePassword = (onError?: (error: AxiosError) => void) => {
//   const { request } = usePut('/api/users', { onError })
//
//   const changePassword = (passwords: {
//     password: string
//     password_confirmation: string
//     current_password: string
//   }) => request(passwords)
//
//   return { changePassword }
// }
//
// export const useForgotPassword = (onComplete?: () => void) => {
//   const { loading, error, request } = usePost('/api/users/password', {
//     onComplete,
//   })
//   const forgotPassword = (email: string) =>
//     request({
//       email,
//       redirect_url: config.FRONTEND_URL + '/passwordReset',
//     })
//   return { forgotPassword, loading, error }
// }
//
// export const useResetPassword = (
//   credentials: CredentialHeaders,
//   onComplete?: () => void,
// ) => {
//   const { loading, error, request, data } = useRequest(
//     'PUT',
//     '/api/users/password',
//     { onComplete },
//   )
//   const resetPassword = (passwords: {
//     password: string
//     password_confirmation: string
//   }) => request(passwords)
//   return { resetPassword, loading, error, data }
// }
