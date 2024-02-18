import express from 'express'
import { UserRepository } from '../respository/userRepository'
import { UserInteractor } from '../interactors/userInteractor'
import { UserController } from '../controllers/userController'
import { validateToken } from '../middleware/auth'

const repository = new UserRepository()
const interactor = new UserInteractor(repository)
const controller = new UserController(interactor)

const router = express.Router()

router.get('/users', controller.onGetUsers.bind(controller))

router.post('/users', controller.onCreateUser.bind(controller))

router.put(
  '/users/:id',
  validateToken,
  controller.onUpdateUser.bind(controller)
)

export default router
