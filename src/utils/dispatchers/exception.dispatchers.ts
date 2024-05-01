import {
  ArgumentsHost,
  BadGatewayException,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  ForbiddenException,
  GatewayTimeoutException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { ExtendedRequestInterface } from '../middleware';
import { MulterError } from 'multer';
import { logger } from '../log.utils';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  /**
   * It will use as a global catcher for the whole project.
   * @param exception unknown
   * @param host ArgumentsHost
   */
  // eslint-disable-next-line max-lines-per-function
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<ExtendedRequestInterface>();
    let message = exception.message ?? 'Unknown error';
    let code = 'HttpException';

    logger.error(
      `requestId: ${request.id}`,
      message,
      (exception as any).stack,
      `${request.method} ${request.url}`,
    );

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.constructor) {
      case UnauthorizedException:
        status = (exception as UnauthorizedException).getStatus();
        message = (exception as UnauthorizedException).message;
        code = (exception as any).code;
        break;
      case HttpException:
        status = (exception as HttpException).getStatus();
        break;
      case BadRequestException:
        status = HttpStatus.BAD_REQUEST;
        message = (exception as BadRequestException).message;
        code = (exception as any).code;
        break;
      case MulterError: // Handle MulterError (Unexpected end of form)
        status = HttpStatus.BAD_REQUEST;
        message = 'Unexpected end of form';
        code = 'MulterError';
        break;
      case Error:
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
        code = (exception as any).code;
        break;
      case UnauthorizedException:
        status = HttpStatus.UNAUTHORIZED;
        message = (exception as UnauthorizedException).message;
        code = (exception as any).code;
        break;
      case NotFoundException:
        status = HttpStatus.NOT_FOUND;
        message = (exception as NotFoundException).message;
        code = (exception as any).code;
        break;
      case ConflictException: // Handle ConflictException
        status = HttpStatus.CONFLICT;
        message = (exception as ConflictException).message;
        code = (exception as any).code;
        break;
      case ForbiddenException: // Handle ForbiddenException
        status = HttpStatus.FORBIDDEN;
        message = (exception as ForbiddenException).message;
        code = (exception as any).code;
        break;
      case TypeError:
        status = HttpStatus.CONFLICT;
        message = (exception as TypeError).message;
        code = (exception as any).code;
        break;
      case InternalServerErrorException:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = (exception as InternalServerErrorException).message;
        code = (exception as any).code;
        break;
      case NotImplementedException:
        status = HttpStatus.NOT_IMPLEMENTED;
        message = (exception as NotImplementedException).message;
        code = (exception as any).code;
        break;
      case BadGatewayException:
        status = HttpStatus.BAD_GATEWAY;
        message = (exception as BadGatewayException).message;
        code = (exception as any).code;
        break;
      case ServiceUnavailableException:
        status = HttpStatus.SERVICE_UNAVAILABLE;
        message = (exception as ServiceUnavailableException).message;
        code = (exception as any).code;
        break;
      case GatewayTimeoutException:
        status = HttpStatus.GATEWAY_TIMEOUT;
        message = (exception as GatewayTimeoutException).message;
        code = (exception as any).code;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = (exception as TypeError).message;
        code = (exception as any).code;
        break;
    }

    logger.error({
      statusCode: status,
      message,
      code,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      exception: exception,
    });

    response.status(status).json({
      is_error: true,
      message: message,
      data: null,
    });
  }
}
