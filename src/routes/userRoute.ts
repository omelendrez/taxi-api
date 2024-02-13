import { Router } from 'express'
import { create, getAll, getOne } from '../controllers/userController'

export const userRoute = Router()

userRoute.post('/users', create)
userRoute.get('/users', getAll)
userRoute.get('/users/:id', getOne)
