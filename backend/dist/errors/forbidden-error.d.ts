import { StatusCodes } from 'http-status-codes';
import CustomApiError from './custom-error';
declare class ForbiddenError extends CustomApiError {
    statusCode: StatusCodes;
    constructor(message: string);
}
export default ForbiddenError;
