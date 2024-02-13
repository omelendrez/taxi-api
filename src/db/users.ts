import { User } from '../models/user'
import { connection } from '../config/db'

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
export default { selectAll }
