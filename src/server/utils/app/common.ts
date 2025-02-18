import type { H3Event } from 'h3'

export const isServerApi = (event: H3Event) => {
  return event.path.startsWith('/api')
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const isContentType = (name: string) => (event: H3Event) => {
  return getHeader(event, 'content-type')?.includes(name)
}
export const isMultipartContent = isContentType('multipart/form-data')
export const isJsonContent = isContentType('application/json')
