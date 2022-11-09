const _getErrorDefaultType = (errorType) => {
    if (errorType) {
        if (typeof errorType === 'object') {
            errorType = JSON.stringify(errorType);
        }
    } else {
        errorType = '';
    }

    return errorType;
};

const _getDefaultErrorCodes = (codes) => {
    if (codes) {
        if (!Array.isArray(codes)) {
            codes = [...codes];
        }
    } else {
        codes = [];
    }
    return codes;
};

const _getDefaultErrorMessage = (message) => {
    if (message) {
        if (message instanceof Error) {
            message = message.toString();
        } else if (typeof message === 'object') {
            message = JSON.stringify(message);
        }
    } else {
        message = '';
    }
    return message;
};

const _getDefaultHttpStatusError = (httpStatusError) => {
    if (httpStatusError === null || typeof httpStatusError !== 'number') {
        return 500;
    }
    return httpStatusError;
};

class CustomError extends Error {
    constructor(errorType = '', codes = [], httpStatusError = null, params = {}, message = '') {
        super(_getDefaultErrorMessage(message));
        this.errorType = _getErrorDefaultType(errorType);
        this.codes = _getDefaultErrorCodes(codes);
        this.httpStatusError = _getDefaultHttpStatusError(httpStatusError);
        this.params = params;
    }

    toString() {
        return `${this.errorType}: ${JSON.stringify(this.code)}\nParams: ${JSON.stringify(this.params)}\nHttpStatusError:${
            this.httpStatusError
        }\nMessage: ${this.message}`;
    }
}

export class AuthError extends CustomError {
    constructor({ codes, httpStatusError, params, message } = {}) {
        super('AuthError', codes, httpStatusError, params, message);
    }
}

export class ApiError extends CustomError {
    constructor({ codes, httpStatusError, params, message } = {}) {
        super('ApiError', codes, httpStatusError, params, message);
    }
}

export class ExternalApiError extends CustomError {
    constructor({ codes, httpStatusError, params, message } = {}) {
        super('ExternalApiError', codes, httpStatusError, params, message);
    }
}

export class ValidationError extends CustomError {
    constructor({ codes, httpStatusError, params, message } = {}) {
        super('ValidationError', codes, httpStatusError, params, message);
    }
}

export class DbError extends CustomError {
    constructor({ codes, httpStatusError, params, message } = {}) {
        super('DbError', codes, httpStatusError, params, message);
    }
}

export class RedisError extends CustomError {
    constructor({ codes, httpStatusError, params, message } = {}) {
        super('RedisError', codes, httpStatusError, params, message);
    }
}

export class ServiceError extends CustomError {
    constructor({ codes, params, httpStatusError, message } = {}) {
        super('ServiceError', codes, httpStatusError, params, message);
    }
}

export class GeneralServerError extends CustomError {
    constructor({ codes, httpStatusError, params, message } = {}) {
        super('GenerlServerError', codes, httpStatusError, params, message);
    }
}

export class DataNotFoundError extends CustomError {
    constructor({ codes, httpStatusError, params, message } = {}) {
        super('DataNotFoundError', codes, httpStatusError, params, message);
    }
}
