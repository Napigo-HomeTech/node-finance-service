import { MongoClient } from 'mongodb';
import process from 'process';
import { logger } from './extlib/@npg-logger';
import dbModule from './extlib/@npg-mongo';
import rest from './framework/rest';
/**
 *
 */
export const initServer = async () => {
    try {
        await dbModule.init();
        rest.init();
    } catch (err: any) {
        logger.error('Could not start server: Initialization failed.' + err.stack);
    }
};

const cleanupResources = (eventType: string) => {
    logger.warn('Cleaning up resources before existing...');
    dbModule.teardown();
    switch (eventType) {
        case 'uncaughtException':
            process.exit(99);
        default:
            process.exit(1);
    }
};

[`SIGINT`, 'uncaughtException'].forEach((eventType) => {
    process.on(eventType, (e) => {
        cleanupResources(eventType);
    });
});
