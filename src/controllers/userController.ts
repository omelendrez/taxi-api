import { Request, Response } from 'express'

import user from '../db/users'

export const getAll = (req: Request, res: Response) => {
  user
    .selectAll()
    .then((users) => {
      // .then for async call
      res.status(200).send({
        message: 'OK',
        result: users
      })
    })
    .catch((err) => {
      res.status(500).send({
        message: 'DATABASE ERROR',
        error: err.code
      })
    })
}
