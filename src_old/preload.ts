import { init, logger } from './extlib/@npg-logger';

const _setupServerEnvironment = async () => {
    init();
    logger.info('Logger setup is done');
};

export const preload = async () => {
    _setupServerEnvironment();
};
