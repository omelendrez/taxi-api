import { User } from '../entities/User'

export interface IUserRepository {
  create(data: User): Promise<User>
  update(id: number, data: User): Promise<User>
  find(limit: number, offset: number): Promise<User[]>
}
