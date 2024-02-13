import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import logger from 'morgan'

import { whitelist } from './utils/whiteList'

dotenv.config()

const app: Express = express()
const port: string = process.env.PORT != null ? process.env.PORT : '3000'

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (whitelist.indexOf(origin) === -1) {
        const reason =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.'
        return callback(new Error(reason), false)
      }
      return callback(null, true)
    }
  })
)

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  )
  next()
})

app.use(
  logger('dev', {
    skip: () => process.env.NODE_ENV === 'production'
  })
)

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Taxi API 🚕' })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
