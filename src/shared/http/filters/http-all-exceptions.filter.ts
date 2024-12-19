import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpAllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus();

    const errorResponse = exception.getResponse() as {
      message: string;
      statusCode?: number;
    };

    const errorMessage = errorResponse.message || 'Internal Server Error';

    const structuredErrorResponse = {
      error: {
        message: errorMessage,
        statusCode: status,
      },
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    };

    response.status(status).json(structuredErrorResponse);
  }
}
