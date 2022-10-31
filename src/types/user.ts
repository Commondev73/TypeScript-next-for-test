import { JwtPayload } from 'jwt-decode'

export interface ISignUp {
  userName: string
  password: string
  confirmPassword?: string
  firstName: string
  lastName: string
  photo?: string | null
}

export interface ISingIn {
  userName: string
  password: string
}

export interface IUpdate {
  firstName: string
  lastName: string
  photo?: string
}

export interface IUserJwtPayload extends JwtPayload {
  userId?: string
  userName?: string
  firstName?: string
  lastName?: string
  status?: string
  photo?: string
}
