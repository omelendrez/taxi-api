import { Request, Response, NextFunction } from 'express'
import { IUserInteractor } from '../interfaces/IUserInteractor'

export class UserController {
  private interactor: IUserInteractor

  constructor(interactor: IUserInteractor) {
    this.interactor = interactor
  }

  async onCreateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body

      const data = await this.interactor.createUser(body)

      return res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }

  async onUpdateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id)
      const body = req.body

      const data = await this.interactor.updateUser(id, body)

      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  async onGetUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const offset = parseInt(`${req.query.offset}`) || 0
      const limit = parseInt(`${req.query.limit}`) || 20

      const data = await this.interactor.getUsers(limit, offset)

      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}
