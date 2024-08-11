import { BASE_URL } from "../constants/constants.ts";
import HTTPTransport from "../helpers/HTTPTransport.ts";
import { CreateUser, Login } from "../types/types.ts";

const authApi = new HTTPTransport({
    baseUrl: BASE_URL,
    url: '/auth'
})

export default class AuthApi {
    async create(data: CreateUser) {
        return authApi.post('/signup', {
            data: JSON.stringify(data),
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    async login(data: Login) {
        return authApi.post('/signin', {
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        })
    }

    async me() {
        return authApi.get('/user', {
            withCredentials: true,
        });
    }

    async logout() {
        return authApi.post('/logout', {
            withCredentials: true,
        })
    }
}
