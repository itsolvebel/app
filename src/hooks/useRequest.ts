"use client"
import axios, { AxiosError } from 'axios'
import { useCallback, useState } from 'react'
import { config } from '@/config'

// axios.defaults.headers.common.Accept = 'application/json'
// axios.defaults.headers.common['Content-Type'] = 'application/json'
// axios.defaults.baseURL = config.BACKEND_URL
//
// export interface CredentialHeaders {
//   'access-token': string
//   client: string
//   uid: string
// }
//
// export interface RequestHandlers<T> {
//   onComplete?: (data: T) => void
//   onError?: (error: AxiosError) => void
// }
//
// export const useRequest = <T = any>(
//   method: 'GET' | 'POST' | 'PUT' | 'DELETE',
//   path: string,
//   options?: RequestHandlers<T>,
//   credentials?: boolean,
// ) => {
//   const [result, setResult] = useState<T>()
//   const [loading, setLoading] = useState<boolean>(false)
//   const [error, setError] = useState<AxiosError>()
//   const request = useCallback(
//     (data?: unknown) => {
//       setLoading(true)
//       axios({ method, url: path, withCredentials: credentials, data })
//         .then(res => {
//           setResult(res.data)
//           setError(undefined)
//           if (options && options.onComplete) {
//             options.onComplete(res.data)
//           }
//         })
//         .catch(error => {
//           setError(error)
//           if (options && options.onError) {
//             options.onError(error)
//           }
//         })
//         .finally(() => setLoading(false))
//     },
//     [path, method],
//   )
//
//   return {
//     data: result,
//     loading,
//     error,
//     request,
//   }
// }
//
// export const useFetch = <T>(path: string, options?: RequestHandlers<T>, credentials?: boolean) =>
//   useRequest('GET', path, options, credentials)
// export const usePost = <T>(path: string, options?: RequestHandlers<T>, credentials?: boolean) =>
//   useRequest('POST', path, options, credentials)
// export const usePut = <T>(path: string, options?: RequestHandlers<T>, credentials?: boolean) =>
//   useRequest('PUT', path, options, credentials)
// export const useDelete = <T>(path: string, options?: RequestHandlers<T>, credentials?: boolean) =>
//   useRequest('DELETE', path, options, credentials)
