import winston from 'winston';
import moment from 'moment';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';
import { AppConfig } from '../../configs/app-config';

const { combine, printf, colorize, align } = winston.format;

/**
 * - Only for HTTP related level, add delimeter "/", example [HTTP/POST]
 * - Do format all levels to uppercase, example [ERROR], []
 * - Also wrap the level indicator with square bracket
 * @returns
 */
const _formatLoggerLevels = () => {
    return winston.format((obj: { level: string; message: any }) => {
        obj.level = obj.level.trim();
        return obj;
    })();
};

const loggerConfig: winston.config.AbstractConfigSet = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 0,
        debug: 3,
        verbose: 4,
        silly: 4
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'cyan',
        http: 'magenta',
        verbose: 'white',
        debug: 'gray',
        silly: 'gray'
    }
};

const _formateLoggerMessage = printf((obj: winston.Logform.TransformableInfo) => {
    const { message, level, service } = obj;

    const ts = moment().utcOffset(8).format('YYY-MM-DD HH:mm:ss.SSS');
    let outputMessage = `${ts} ${level}:`;
    let identifierMessage = '';
    if (service) identifierMessage += ` ${service}`;
    if (identifierMessage) outputMessage += ` [${identifierMessage.trim()}]`;
    if (message) outputMessage += ` ${message}`;

    return outputMessage;
});

const _getLoggerFormatter = () => {
    if (AppConfig.LOGGING.with_color === 'true') {
        return combine(_formatLoggerLevels(), colorize(), _formateLoggerMessage, align());
    }
    return combine(_formatLoggerLevels(), _formateLoggerMessage, align());
};

/**
 *
 * @param serviceName
 */
const createLogger = (serviceName: string): winston.Logger => {
    winston.addColors(loggerConfig.colors);

    const options: ConsoleTransportOptions = {
        format: _getLoggerFormatter(),
        handleExceptions: true
    };
    return winston.createLogger({
        level: AppConfig.LOGGING.level || 'verbose',
        levels: loggerConfig.levels,
        defaultMeta: { service: serviceName },
        transports: [new winston.transports.Console(options)],
        exitOnError: false
    });
};

class NPGLoggerAPI {
    public logger;

    constructor(logger: winston.Logger) {
        this.logger = logger;
    }

    info(msg: any) {
        this.logger.info(msg);
    }
    error(msg: any) {
        this.logger.error(msg);
    }
    http(msg: any) {
        this.logger.http(msg);
    }
    warn(msg: any) {
        this.logger.warn(msg);
    }
    debug(msg: any) {
        this.logger.debug(msg);
    }
    verbose(msg: any) {
        this.logger.verbose(msg);
    }
}

let logger: NPGLoggerAPI;

/**
 *
 * @param serviceName
 */
const init = () => {
    logger = new NPGLoggerAPI(createLogger(AppConfig.SERVICE.name || 'unknown-service'));
};

export { init, logger };
