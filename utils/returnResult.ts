/**
 * Creates a JSON response with a status of success or failure.
 * @param {boolean} status - Whether the request was successful or not.
 * @param {object} data - Any data to be included in the response.
 * @param {string} message - Any message to be included in the response.
 * @returns {object} - The JSON response.
 */
export const SUCCESS_RESULT = (status: boolean, message: string | undefined, data?: object | undefined, pagination?: object | undefined) => {
    return {
        status,
        data,
        message,
        pagination
    };
};

/**
 * Creates a JSON response with a status of error.
 * @param {boolean} status - Whether the request was successful or not.
 * @param {number} code - A unique HTTP error code.
 * @param {string} message - A human-readable error message.
 * @returns {object} - The JSON response.
 */
export const ERROR_RESULT = (
    status: boolean,
    code: number,
    message: string
) => {
    return {
        status,
        code,
        message
    };
};