import { createLogger } from './extlib/logger';

const _setupServerEnvironment = () => {
    return Promise.resolve(createLogger());
};

export const preload = async () => {
    await _setupServerEnvironment();
};
