import { Router } from 'express'

export const defaultRoute = Router()

defaultRoute.get('/', (req, res) => {
  res.json({ message: 'Welcome to Taxi API 🚕' })
})
