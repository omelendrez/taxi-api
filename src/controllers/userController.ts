import { Request, Response } from 'express'

import user, { InsertResult } from '../db/users'

export const create = (req: Request, res: Response) => {
  user
    .addNew(req.body)
    .then((insertResult: InsertResult) => {
      // .then for async call
      res.status(201).send({
        status: 'OK',
        result: insertResult
      })
    })
    .catch((err) => {
      res.status(500).send({
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
      res.status(200).send({
        status: 'OK',
        result: users
      })
    })
    .catch((err) => {
      res.status(500).send({
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
      res.status(200).send({
        status: 'OK',
        result: users
      })
    })
    .catch((err) => {
      res.status(500).send({
        status: 'DATABASE ERROR',
        code: err.code,
        message: err.message
      })
    })
}
