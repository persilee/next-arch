import 'h3'
import type { JwtPayload } from 'jsonwebtoken'
import type { Token } from '~/schema/jwt'
import type { Item as User } from '~/schema/user'
import type { AppAbility } from '~/server/utils/ability'

declare module 'h3' {
  export interface H3EventContext {
    user: User
    token: {
      error?: Error | undefined
      payload?: Token | undefined
    }
    ability: AppAbility
  }
}
