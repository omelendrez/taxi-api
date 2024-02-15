import { Request, Response, NextFunction } from 'express'
import type { JwtPayload } from 'jsonwebtoken'

import { verifyToken } from '../utils/auth'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { TOFIX } from '../entities/common'
// Even TOFIX type alias is being used in the code below (error catch),
// eslint still shows error 'var not in use' ?!?!?
// So I disabled eslint for this line

export const validateToken = async (
  req: Request & { decoded?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  const authHeader: string = req.headers.authorization ?? ''
  let result = {
    code: 401,
    message: 'Token required',
    detail: 'A token is needed to acceess this resource.'
  }

  if (authHeader) {
    const token: string = req.headers.authorization?.split(' ')[1] ?? ''
    try {
      req.decoded = (await verifyToken(token)) as JwtPayload
      return next()
    } catch (error: TOFIX) {
      if (error?.message === 'jwt expired') {
        result = {
          code: 401,
          message: 'Token expired',
          detail:
            'The token needed to acceess this resource has expired, please log in again.'
        }
      }
    }
  }
  return res.status(401).send(result)
}
