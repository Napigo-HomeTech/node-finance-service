export const AppConfig = {
    SERVICE: {
        name: process.env.SERVICE_NAME,
        port: process.env.SERVICE_PORT ?? ''
    },
    DATABASE: {
        NAME: process.env.DATABASE_NAME ?? '',
        DOMAIN: process.env.DATABASE_DOMAIN ?? '',
        PORT: process.env.DATABASE_PORT ?? '',
        USER: process.env.DATABASE_USER ?? '',
        PASSWORD: process.env.DATABASE_PASSWORD ?? ''
    },
    JWT: {
        issuer: process.env.JWT_ISSUER,
        secret: process.env.JWT_SECRET || '',
        audience: process.env.JWT_AUDIENCE || '',
        alg: process.env.JWT_ALG || '',
        kid: process.env.JWT_KID || ''
    },
    LOGGING: {
        with_color: process.env.LOG_WITH_COLOR,
        level: process.env.LOG_LEVEL
    }
};
