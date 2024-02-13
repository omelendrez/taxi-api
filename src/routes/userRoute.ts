import { Router } from 'express'
import { getAll, getOne } from '../controllers/userController'

export const userRoute = Router()

userRoute.get('/users', getAll)
userRoute.get('/users/:id', getOne)
