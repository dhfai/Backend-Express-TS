import { PrismaClient } from "@prisma/client"
import { logger } from "./loggin.";

export const prismaClient = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
        {
            emit: 'event',
            level: 'error',
        }
    ]
});

prismaClient.$on('error', (e) => {
    logger.error(e);
})

prismaClient.$on('warn', (e) => {
    logger.warn(e);
})

prismaClient.$on('info', (e) => {
    logger.info(e);
})

prismaClient.$on('query', (e) => {
    logger.debug(e);
})

