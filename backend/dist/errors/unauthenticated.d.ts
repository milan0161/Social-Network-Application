import { StatusCodes } from "http-status-codes";
import CustomApiError from "./custom-error";
declare class UnauthenticatedError extends CustomApiError {
    statusCode: StatusCodes;
    constructor(message: string);
}
export default UnauthenticatedError;
