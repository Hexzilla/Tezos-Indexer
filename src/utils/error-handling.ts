import { Application, Request, Response } from 'express';
import { IS_PRODUCTION } from './secrets';

export interface NotFoundError extends Error {
  status?: number;
}

export function loadErrorHandlers(app: Application) {
  // catch 404 errors and forward to error handler
  app.use((req, res, next) => {
    const err: NotFoundError = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err: any, req: Request, res: Response, next: any) => {
    console.error(err);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: !IS_PRODUCTION ? err : {},
      },
    });
  });
}
