import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserPayload, CustomLogger } from './../index';
import { v4 as uuid } from 'uuid';

export interface ExtendedRequestInterface extends Request {
    user: UserPayload;
    id: string;
}

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    private readonly logger = new CustomLogger(RequestLoggerMiddleware.name);

    handleResponseFinish(res: Response, req: ExtendedRequestInterface, perf: number) {
        const { ip, method, originalUrl } = req;
        const hostname = require('os').hostname();
        const userAgent = req.get('user-agent') || '';
        const referer = req.get('referer') || '';
        const { statusCode } = res;
        const contentLength = res.get('content-length');
        const perfEnd = performance.now() - perf;
        this.logger.log(`Body for req id: ${req.id} ${JSON.stringify(req.body)}`);
        this.logger.log(
            `requestId: ${req.id} [${hostname}] method=${method} url='${originalUrl}' performance=${perfEnd} statusCode='${statusCode}'  contentLength='${contentLength}'  refer='${referer}' user_agent='${userAgent}' ip='${ip}'`,
        );
    }

    use(request: ExtendedRequestInterface, response: Response, next: NextFunction): void {
        const perf = performance.now();
        request.id = uuid();
        response.on('finish', () => this.handleResponseFinish(response, request, perf));
        next();
    }
}
