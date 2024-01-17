export const version = process.env.VERCEL_GIT_COMMIT_SHA ?? "local"

export const isServer = typeof window === "undefined"
export const isBrowser = !isServer

const vercelEnv = process.env.VERCEL_ENV ?? "development"
export const isDevelopment = vercelEnv === "development"
export const isProduction = vercelEnv === "production"
export const isPreview = vercelEnv === "preview"
