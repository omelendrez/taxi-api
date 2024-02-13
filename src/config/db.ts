import { createPool } from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const host = process.env.MYSQL_HOST
const port = Number(process.env.MYSQL_PORT)
const user = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD
const database = process.env.MYSQL_DATABASE

export const connection = createPool({ host, port, user, password, database })
