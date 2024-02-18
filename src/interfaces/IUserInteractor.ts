import { TOFIX } from './common'

export interface IUserInteractor {
  createUser(input: TOFIX): TOFIX
  updateUser(id: number, input: TOFIX): TOFIX
  getUsers(limit: number, offset: number): TOFIX
}
