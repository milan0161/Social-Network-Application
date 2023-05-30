import CustomApiError from "./custom-error";
import { StatusCodes } from "http-status-codes";
declare class NotFoundError extends CustomApiError {
    statusCode: StatusCodes;
    constructor(message: string);
}
export default NotFoundError;
