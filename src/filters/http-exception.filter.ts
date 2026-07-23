import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { Prisma } from "generated/prisma/client";
import { EXCLUDE_DATA_METHODS } from "src/lib/constants";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string | string[] = 'An internal server error occured';

        if (exception instanceof HttpException) {

            statusCode = exception.getStatus();
            const res = exception.getResponse();

            if (typeof res === 'string') message = res;
            else if (typeof res === 'object' && res !== null) message = (res as any).message ?? message

        } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
            switch (exception.code) {
                case 'P2002':
                    statusCode = HttpStatus.CONFLICT;
                    message = 'A record with that data already exist';
                    break;
                case 'P2025':
                    statusCode = HttpStatus.NOT_FOUND;
                    message = 'Record not found';
                    break;
                case 'P2003':
                    statusCode = HttpStatus.BAD_REQUEST;
                    message = 'Invalid related data (foreign key constraint)'
                default:
                    statusCode = HttpStatus.BAD_REQUEST;
                    message = 'A database error occured'
            }
        } else if (exception instanceof Prisma.PrismaClientValidationError) {
            statusCode = HttpStatus.BAD_REQUEST
            message = 'The submmited data does not match the expected schema';
        }

        const base = {
            response_code: statusCode,
            message,
        }

        const body = EXCLUDE_DATA_METHODS.includes(req.method) ? base : { response_code: base.response_code, data: null, message: base.message }

        res.status(statusCode).json(body)
    }
}