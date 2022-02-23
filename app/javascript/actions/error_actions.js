export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS'
export const CLEAR_FILE_ERRORS = 'CLEAR_FILE_ERRORS'

export const receiveErrors = (err) => ({
    type: RECEIVE_ERRORS,
    err
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS
});

export const clearFileErrors = () => ({
    type: CLEAR_FILE_ERRORS
});