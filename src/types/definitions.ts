export interface IRegister {
    username: string,
    email: string,
    password: string,
    password2: string
}
export interface ILogin {
    username: string,
    password: string,
}

export interface IUser {
    id: string
    username: string
    email: string
    avatar?: string | null
}
