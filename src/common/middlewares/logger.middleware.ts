import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction, Response } from 'express';

// 요성시 터미널에 로그 찍히게 해주는 미들웨어
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.logger.log(res.statusCode);
    });
    next();
  }
}
