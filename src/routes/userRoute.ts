import { Router } from 'express'
import { getAll } from '../controllers/userController'

export const userRoute = Router()

userRoute.get('/users', getAll)
