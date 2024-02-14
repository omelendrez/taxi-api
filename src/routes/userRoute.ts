import { Router } from 'express'
import { create, getAll, getOne } from '../controllers/userController'
import { validateToken } from '../middleware/auth'

export const userRoute = Router()

userRoute.post('/users', validateToken, create)
userRoute.get('/users', validateToken, getAll)
userRoute.get('/users/:id', validateToken, getOne)
