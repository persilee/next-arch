import IORedis from 'ioredis'

const config = useRuntimeConfig()

export const redisConnection = {
  host: config.redis.host,
  port: config.redis.port,
  username: config.redis.username,
  password: config.redis.password,
  maxRetriesPerRequest: null,
}
