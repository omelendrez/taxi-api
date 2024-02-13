import { NewUser, User } from '../models/user'
import { connection } from '../config/db'

export interface InsertResult {
  message: string
}

const addNew = (newUser: NewUser): Promise<InsertResult> => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      const { name, firstName, lastName, email, mobile, password, role } =
        newUser

      if (!name) {
        return reject({
          status: 'ERROR',
          message: 'El campo Nombre es requerido',
          code: '40101'
        })
      }

      if (!password) {
        return reject({
          status: 'ERROR',
          message: 'El campo Password es requerido',
          code: '40102'
        })
      }
      conn.query(
        `INSERT INTO users (name, first_name, last_name, email, mobile, password, role) VALUES
        ('${name}', '${firstName}', '${lastName}', '${email}', '${mobile}', '${password}', ${role});`,
        (err) => {
          conn.release()
          if (err) {
            return reject(err)
          }
          return resolve({
            message: `Usuario '${name}' ha sido creado con éxito`
          })
        }
      )
    })
  })
}

const selectAll = (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      conn.query('select * from users;', (err, resultSet: User[]) => {
        conn.release()
        if (err) {
          return reject(err)
        }
        return resolve(resultSet)
      })
    })
  })
}

const getById = (id: number): Promise<User> => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      conn.query(
        `SELECT * FROM users WHERE id=${id};`,
        (err, resultSet: User) => {
          conn.release()
          if (err) {
            return reject(err)
          }
          return resolve(resultSet)
        }
      )
    })
  })
}

export default { addNew, selectAll, getById }
