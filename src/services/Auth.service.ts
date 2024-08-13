import AuthApi from "../api/Auth.api";
import Router from "../helpers/Router";
import Store from "../helpers/Store";
import { Routes } from "../main";
import { CreateUser, Login } from "../types/types";

const store = Store;
const router = Router;
const authApi = new AuthApi();

export const login = async (model: Login) => {
    try {
        const data = await authApi.login(model);
        const { response, status } = data;
        switch (status) {
            case 200:
                store.set({ loginError: null });
                await me();
                break;
            case 400:
                store.set({ loginError: JSON.parse(response as string) });
                break;
            case 401:
                store.set({ loginError: JSON.parse(response as string) });
                router.go(Routes.Login);
                break;
            case 500:
                store.set({ loginError: JSON.parse(response as string) });
                break;
            default:
                store.set({
                    loginError: { reason: "Неизвестная ошибка", status },
                });
                break;
        }
    } catch (error) {
        console.error(error);
        store.set({ loginError: { reason: "Неизвестная ошибка" } });
    }
};

export const create = async (model: CreateUser) => {
    try {
        const data = await authApi.create(model);
        const { response, status } = data;
        const responseParse = JSON.parse(response as string);
        switch (status) {
            case 200:
                store.set({ createUserError: null });
                await me();
                break;
            case 400:
                store.set({ createUserError: responseParse });
                break;
            case 401:
                store.set({ createUserError: responseParse });
                router.go(Routes.Login);
                break;
            case 500:
                store.set({ createUserError: responseParse });
                break;
            default:
                store.set({
                    createUserError: { reason: "Неизвестная ошибка", status },
                });
                break;
        }
    } catch (error) {
        console.error(error);
        store.set({ createUserError: { reason: "Неизвестная ошибка" } });
    }
};

export const me = async () => {
    try {
        const data = await authApi.me();
        const { response, status } = data;
        const responseParse = JSON.parse(response as string);
        switch (status) {
            case 200:
                store.set({ currentUser: responseParse });
                store.set({ getUserError: null });
                break;
            case 400:
                store.set({ getUserError: responseParse });
                break;
            case 401:
                store.set({ getUserError: responseParse });
                router.go(Routes.Login);
                break;
            case 500:
                store.set({ getUserError: responseParse });
                break;
            default:
                store.set({ getUserError: { reason: "Неизвестная ошибка" } });
                router.go(Routes.Chats);
                break;
        }
    } catch (error) {
        console.error(error);
        store.set({ getUserError: { reason: "Неизвестная ошибка" } });
    }
};

export const logout = async () => {
    try {
        await authApi.logout();
        const { response, status } = await authApi.me();
        const responseParse = JSON.parse(response as string);
        store.set({ currentUser: null });
        switch (status) {
            case 200:
                router.go(Routes.Login);
                break;
            case 500:
                store.set({ logoutError: responseParse });
                router.go(Routes.Login);
                break;
            default:
                store.set({ logoutError: { reason: "Неизвестная ошибка" } });
                router.go(Routes.Login);
                break;
        }
    } catch (error) {
        console.error(error);
        store.set({ logoutError: { reason: "Неизвестная ошибка" } });
    }
};
