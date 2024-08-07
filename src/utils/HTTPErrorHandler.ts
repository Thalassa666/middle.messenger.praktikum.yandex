import Router from "../helpers/Router";
import Store from "../helpers/Store";
import { Routes } from "../main";
const defaultStore = Store;
const router = Router;

export const HttpResponseHandler = (status: number, response: any, stateError: any, store = defaultStore, stateData?: any): void => {
    switch (status) {
        case 200:
            store.set({ [stateData]: JSON.parse(response) })
            store.set({ [stateError]: null })
            break;
        case 400:
            store.set({ [stateError]: JSON.parse(response) })
            break;
        case 401:
            store.set({ [stateError]: JSON.parse(response) })
            router.go(Routes.Login)
            break;
        case 500:
            store.set({ [stateError]: JSON.parse(response) })
            break;
        default:
            store.set({ [stateError]: { reason: "Неизвестная ошибка", status } })
            router.go(Routes.Login)
            break;
    }
}
