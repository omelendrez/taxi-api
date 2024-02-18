import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'
import csrf from 'csurf'
import compression from 'compression'
import { whitelist } from './utils/whiteList'

import { defaultRouter, userRouter } from './routes'

dotenv.config()

const app: Express = express()
app.disable('x-powered-by')
app.use(helmet())
app.use(compression())

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

const apiVersion = '/api/v1'

app.use(apiVersion, defaultRouter)
app.use(apiVersion, userRouter)

app.use('/', (req, res) => {
  res.status(400).json({ message: 'Resource does not exist 😕' })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

app.use(csrf())
