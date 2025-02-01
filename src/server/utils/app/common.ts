import type { H3Event } from 'h3'

export const isServerApi = (event: H3Event) => {
  return event.path.startsWith('/api')
}
