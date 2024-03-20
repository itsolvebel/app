import { config } from '@/config'
import { FetchingError } from '@/lib/errors'
import { refreshAccessToken } from '@/lib/auth'

type Fetcher = {
  get<T>(resource: string, options?: RequestInit): Promise<T>;
  post<T>(resource: string, body: T, options?: RequestInit): Promise<T>;
  put<T>(resource: string, body: T, options?: RequestInit): Promise<T>;
  delete<T>(resource: string, body: T, options?: RequestInit): Promise<T>;
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

const Fetcher = (baseUrl: string): Fetcher => {
  const makeRequest = async <T>(method: Method, resource: string, options?: RequestInit, body?: T): Promise<T> => {
    resource = filterResourceString(resource)
    const requestOptions: RequestInit = {
      credentials: 'include',
      method,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }

    const response = await fetch(`${baseUrl}${resource}`, requestOptions)

    if (response.status === 401) {
      const res = await refreshAccessToken()
      // @ts-ignore
      if (res.ok && response.status !== 401) {
        return makeRequest(method, resource, options, body)
      } else {
        window.location.href = '/login'
      }
    }

    const contentType = response.headers.get('content-type')

    if (!response.ok) {
      if (contentType && contentType.includes('application/json')) {
        const errorBody = await response.json()
        throw new FetchingError(response.status, `Failed to ${method.toLowerCase()}`, errorBody)
      } else {
        throw new FetchingError(response.status, 'There was an error fetching', {})
      }
    }
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    } else {
      return response as any
    }
  }

  const get = async <T>(resource: string, options?: RequestInit): Promise<T> => {
    return makeRequest('GET', resource, options)
  }

  const post = async <T>(resource: string, body: T, options?: RequestInit): Promise<T> => {
    return makeRequest('POST', resource, options, body)
  }
  const put = async <T>(resource: string, body: T, options?: RequestInit): Promise<T> => {
    return makeRequest('PUT', resource, options, body)
  }

  const deleteRequest = async <T>(resource: string, body: T, options?: RequestInit): Promise<T> => {
    return makeRequest('DELETE', resource, options, body)
  }

  return { get, post, put, delete: deleteRequest }
}

const filterResourceString = (resource: string) => {
  if (resource.slice(0, 1) !== '/') {
    return `/${resource}`
  }
  return resource
}

const fetcher = Fetcher(config.BACKEND_URL)
const authFetcher = Fetcher(config.AUTH_API_URL)


export { fetcher, authFetcher }
