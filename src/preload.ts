import { createLogger } from './extlib/npg-logger';

const _setupServerEnvironment = () => {
    return Promise.resolve(createLogger());
};

export const preload = async () => {
    await _setupServerEnvironment();
};
