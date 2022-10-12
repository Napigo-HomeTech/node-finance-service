/**
 *
 * @param msg
 * @returns
 */
const _getDefaultErrorMessage = (msg: string | Error) => {
    if (msg) {
        if (msg instanceof Error) {
            msg = msg.toString();
        } else if (typeof msg === 'object') {
            msg = JSON.stringify(msg);
        }
    } else {
        msg = '';
    }
    return msg;
};

const _getDefaultErrorType = (errType: any) => {
    if (errType && typeof errType === 'object') {
        errType = JSON.stringify(errType);
    } else {
        errType = '';
    }
    return errType;
};

class NPGError extends Error {
    public errorType;
    public codes;
    constructor(errorType = '', codes = [], httpStatusError = null, params = {}, message = '') {
        super(_getDefaultErrorMessage(message));
        this.errorType = _getDefaultErrorType(errorType);
        this.codes = codes;
    }
}
