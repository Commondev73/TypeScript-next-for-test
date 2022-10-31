export interface ISignUp {
  userName: string
  password: string
  firstName: string
  lastName: string
  photo?: string
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
