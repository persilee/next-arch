import 'h3'

declare module 'h3' {
  export interface H3EventContext {
    user: {
      name: string
    }
  }
}