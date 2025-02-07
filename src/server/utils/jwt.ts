const config = useRuntimeConfig()

export const jwtPublicKey = Buffer.from(config.jwt.privateKey, 'base64').toString()
export const jwtPrivateKey = Buffer.from(config.jwt.privateKey, 'base64').toString()
