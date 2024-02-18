import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { User } from '../entities/User'

const secret: string = process.env.JWT_SECRET ?? ''

export const createToken = async (user: User) =>
  await jwt.sign({ data: user }, secret, {
    expiresIn: '1d',
    algorithm: 'HS256'
  })

export const verifyToken = async (token: string) =>
  await jwt.verify(token, secret)

export const passwordHash = async (password: string) =>
  await bcrypt.hash(password, 10)

export const comparePassword = async (password1: string, password2: string) =>
  await bcrypt.compare(password1, password2)
