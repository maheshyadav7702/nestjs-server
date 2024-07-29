import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express'; //imported Request and Response from express

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.json({
      statusCode:
        exception instanceof HttpException ? exception.getStatus() : 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
