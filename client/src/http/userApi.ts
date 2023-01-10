import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode'

export const registration = async (email: string, password: string) => {
    console.log('registration')
    const {data} = await $host.post('api/user/registration', {email: email, password: password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email: string, password: string) => {
    console.log('login')
    const {data} = await $host.post('api/user/login', {email: email, password: password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    console.log('auth')
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}