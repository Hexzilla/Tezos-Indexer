import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation Error',
      errors: errors.array(),
    })
  }

  next()
}

export function createHandler(callback: (req: Request) => object) {
  return async (req: Request, res: Response) => {
    try {
      const data = await callback(req);
      return res.json({ data: data })
    } catch (error: any) {
      console.error(error);
      return res.status(501).json({
        error: true,
        message: error?.message,
      })
    }
  }
}
