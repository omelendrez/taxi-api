import { Request, Response } from 'express'

import user, { InsertResult } from '../db/users'

export const create = (req: Request, res: Response) => {
  user
    .addNew(req.body)
    .then((insertResult: InsertResult) => {
      // .then for async call
      res.status(201).json({
        status: 'OK',
        result: insertResult
      })
    })
    .catch((err) => {
      res.status(500).json({
        status: err.status,
        code: err.code,
        message: err.message
      })
    })
}

export const getAll = (req: Request, res: Response) => {
  user
    .selectAll()
    .then((users) => {
      // .then for async call
      res.status(200).json({
        status: 'OK',
        result: users
      })
    })
    .catch((err) => {
      res.status(500).json({
        status: 'DATABASE ERROR',
        code: err.code,
        message: err.message
      })
    })
}

export const getOne = (req: Request, res: Response) => {
  user
    .getById(Number(req.params.id))
    .then((users) => {
      // .then for async call
      res.status(200).json({
        status: 'OK',
        result: users
      })
    })
    .catch((err) => {
      res.status(500).json({
        status: 'DATABASE ERROR',
        code: err.code,
        message: err.message
      })
    })
}
