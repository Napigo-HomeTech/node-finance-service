import dbModule from './extlib/npg-mongo';
import rest from './framework/rest';

/**
 *
 */
export const initServer = async () => {
    try {
        await dbModule.init();
        rest.init();
    } catch (err: any) {
        console.log('Could not start server: Initialization failed', err);
        process.exit(0);
    }
};

const cleanupResources = async () => {
    console.info('Cleaning up resources before exiting process');
    dbModule.teardown();
};

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
    process.on(eventType, cleanupResources.bind(null, eventType));
});
