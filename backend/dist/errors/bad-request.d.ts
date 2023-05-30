import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-error';
declare class BadRequestError extends CustomAPIError {
    statusCode: StatusCodes;
    constructor(message: string);
}
export default BadRequestError;
