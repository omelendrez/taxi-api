export interface User {
  id: number
  name: string
  first_name: string
  last_name: string
  email: string
  mobile: string
  role: number
  created: string
  status: number
}

export interface NewUser {
  name: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  password: string
  role: number
}
