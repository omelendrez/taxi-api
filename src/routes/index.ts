import express from 'express'
import { defaultRoute } from './defaultRoute'
import { userRoute } from './userRoute'

export const routes = express.Router()

routes.use(defaultRoute)
routes.use(userRoute)
