import { api, user_endpoints } from '..'

interface IUserReg {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

interface IUserAuth {
    email: string,
    password: string,
}

export const registrationUser = (userValue: IUserReg) => {
    return api.post(user_endpoints.register, userValue)
}

export const authUser = (userValue: IUserAuth) => {
    return api.post(user_endpoints.login, userValue)
}

export const getUser = (id: string) => {
    return api.get(`${user_endpoints.getUser}/${id}`)
}