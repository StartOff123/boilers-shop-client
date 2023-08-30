export interface IInputsRegiser {
    name: string
    email: string
    password: string
}

export interface IInputsLogin {
    email: string
    password: string
}

export interface ISignUpFx {
    url: string
    username: string
    password: string
    email: string
}

export interface ISignInFx {
    url: string
    password: string
    username: string
}

export interface IUser {
    username: string
    userId: number | string
    email: string
}