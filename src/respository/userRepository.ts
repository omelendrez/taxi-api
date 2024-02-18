import { connection } from '../config/db'
import { User } from '../entities/User'
import { IUserRepository } from '../interfaces/IUserRepository'
import { TOFIX } from '../interfaces/common'

export class UserRepository implements IUserRepository {
  private client: TOFIX

  constructor() {
    this.client = connection
  }

  async create({
    name,
    first_name,
    last_name,
    email,
    mobile,
    role
  }: User): Promise<User> {
    const user = await this.client.query(
      `INSERT INTO users (name, first_name, last_name, email, mobile, role) VALUES
      ('${name}', '${first_name}', '${last_name}', '${email}', '${mobile}', ${role});`
    )

    return user
  }

  async update(
    id: number,
    { name, first_name, last_name, email, mobile, role }: User
  ): Promise<User> {
    const user = await this.client.query(
      `UPDATE users SET name='${name}', first_name='${first_name}', last_name='${last_name}', email='${email}', mobile='${mobile}', role=${role})
      WHERE id=${id};`
    )

    return user
  }

  async find(limit: number, offset: number): Promise<User[]> {
    const users = await this.client.query(`SELECT * FROM users LIMIT ?,?;`, [
      offset,
      limit
    ])

    return users[0]
  }
}
