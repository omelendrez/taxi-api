import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Taxi API 🚕' })
})

export default router
