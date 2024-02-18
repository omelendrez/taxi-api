import { TOFIX } from '../interfaces/common'
import { IUserInteractor } from '../interfaces/IUserInteractor'
import { IUserRepository } from '../interfaces/IUserRepository'

export class UserInteractor implements IUserInteractor {
  private repository: IUserRepository

  constructor(repository: IUserRepository) {
    this.repository = repository
  }

  async createUser(input: TOFIX) {
    return this.repository.create(input)
  }

  async updateUser(id: number, input: TOFIX) {
    return this.repository.update(id, input)
  }

  async getUsers(limit: number, offset: number) {
    return this.repository.find(limit, offset)
  }
}
