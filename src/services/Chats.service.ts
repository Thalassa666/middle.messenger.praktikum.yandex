import ChatsApi from '../api/Chats.api';
import Router from '../helpers/Router.ts';
import Store from '../helpers/Store.ts';
import { Routes } from '../main.ts';
import {
    UsersRequest,
    ChatsResponse,
    CreateChat,
    CreateChatResponse,
    ChangeChatAvatarSubmitData
} from '../types/types.ts';

const router = Router;
const store = Store;
const chatsApi = new ChatsApi();

export const loadChats = async () => {
    try {
        const data = await chatsApi.getChats();
        const { response, status } = data
        const responseParse = JSON.parse(response)
        switch (status) {
            case 200:
                store.set({ chats: responseParse })
                store.set({ getChatsError: null })
                break;
            case 401:
                store.set({ getChatsError: responseParse })
                store.set({ chats: [] })
                router.go(Routes.Login)
                break;
            case 500:
                store.set({ getChatsError: responseParse })
                store.set({ chats: [] })
                break;
            default:
                store.set({ getChatsError: { reason: "Неизвестная ошибка" } })
                break;
        }

    } catch (error) {
        console.error(error)
        store.set({ getChatsError: { reason: "Неизвестная ошибка" } })
    }
}

export const createChat = async (title: CreateChat) => {
    try {
        const data = await chatsApi.createChat(title);
        const { response, status } = data
        const responseParse = JSON.parse(response)
        switch (status) {
            case 200:
                loadChats()
                store.set({ createChatsError: null })
                break;
            case 400:
                loadChats()
                store.set({ createChatsError: responseParse })
                break;
            case 401:
                store.set({ createChatsError: responseParse })
                store.set({ chats: [] })
                router.go(Routes.Login)
                break;
            case 500:
                store.set({ createChatsError: responseParse })
                store.set({ chats: [] })
                router.go(Routes.Error)
                break;
            default:
                store.set({ createChatsError: { reason: "Неизвестная ошибка" } })
                break;
        }

    } catch (error) {
        console.error(error)
        store.set({ createChatsError: { reason: "Неизвестная ошибка" } })
    }
}

export const addUserToChat = async (userData: UsersRequest) => {
    try {
        const data = await chatsApi.addUserToChat(userData);
        const { response, status } = data
        const responseParse = JSON.parse(response)
        switch (status) {
            case 200:
                store.set({ addUserToChatError: null })
                break;
            case 400:
                loadChats()
                store.set({ addUserToChatError: responseParse })
                break;
            case 401:
                store.set({ addUserToChatError: responseParse })
                router.go(Routes.Login)
                break;
            case 500:
                store.set({ addUserToChatsError: responseParse })
                router.go(Routes.Error)
                break;
            default:
                store.set({ addUserToChatError: { reason: "Неизвестная ошибка" } })
                break;
        }

    } catch (error) {
        console.error(error)
        store.set({ addUserToChatError: { reason: "Неизвестная ошибка" } })
    }
}

export const deleteUserFromChat = async (userData: UsersRequest) => {
    try {
        const data = await chatsApi.deleteUserFromChat(userData);
        const { response, status } = data
        const responseParse = JSON.parse(response)
        switch (status) {
            case 200:
                store.set({ deleteUserFromChatError: null })
                break;
            case 400:
                loadChats()
                store.set({ deleteUserFromChatError: responseParse })
                break;
            case 401:
                store.set({ deleteUserFromChatError: responseParse })
                router.go(Routes.Login)
                break;
            case 500:
                store.set({ deleteUserFromChatError: responseParse })
                router.go(Routes.Error)
                break;
            default:
                store.set({ deleteUserFromChatError: { reason: "Неизвестная ошибка" } })
                break;
        }

    } catch (error) {
        console.error(error)
        store.set({ deleteUserFromChatError: { reason: "Неизвестная ошибка" } })
    }
}

export const setActiveChat = (activeChat: ChatsResponse) => {
    store.set({ activeChat });
}

export const deleteChat = async (model: CreateChatResponse) => {
    try {
        const data = await chatsApi.deleteChat(model);
        const { response, status } = data
        const responseParse = JSON.parse(response)
        switch (status) {
            case 200:
                store.set({ deleteChatError: null })
                store.set({ activeChat: null })
                await loadChats()
                break;
            case 400:
                loadChats()
                store.set({ deleteChatError: responseParse })
                break;
            case 401:
                store.set({ deleteChatError: responseParse })
                router.go(Routes.Login)
                break;
            case 403:
                store.set({ deleteChatError: responseParse })
                router.go(Routes.Login)
                break;
            case 500:
                store.set({ deleteChatError: responseParse })
                router.go(Routes.Error)
                break;
            default:
                store.set({ deleteChatError: { reason: "Неизвестная ошибка" } })
                break;
        }

    } catch (error) {
        console.error(error)
        store.set({ deleteChatError: { reason: "Неизвестная ошибка" } })
    }
}

export const getActiveChatUsers = async (id: number) => {
    try {
        const data = await chatsApi.getActiveChatUsers(id);
        const { response, status } = data
        const responseParse = JSON.parse(response)
        switch (status) {
            case 200:
                store.set({ activeChatUsers: responseParse })
                store.set({ getActiveChatUsersError: null })
                break;
            case 400:
                store.set({ activeChatUsers: [] })
                store.set({ getActiveChatUsersError: responseParse })
                break;
            case 401:
                store.set({ activeChatUsers: [] })
                store.set({ getActiveChatUsersError: responseParse })
                router.go(Routes.Login)
                break;
            case 404:
                store.set({ activeChatUsers: [] })
                store.set({ getActiveChatUsersError: responseParse })
                router.go(Routes.Error)
                break;
            case 500:
                store.set({ activeChatUsers: [] })
                store.set({ getActiveChatUsersError: responseParse })
                router.go(Routes.Error)
                break;
            default:
                store.set({ getActiveChatUsersError: { reason: "Неизвестная ошибка" } })
                break;
        }

    } catch (error) {
        console.error(error)
        store.set({ getActiveChatUsersError: { reason: "Неизвестная ошибка" } })
    }
}

export const getToken = async (chatId: number) => {
    try {
        const data = await chatsApi.getToken(chatId)
        const { response, status } = data
        const responseParse = JSON.parse(response)
        switch (status) {
            case 200:
                store.set({ token: responseParse })
                store.set({ getTokenError: null })
                return JSON.parse(response)
            case 401:
                store.set({ token: undefined })
                store.set({ getTokenError: responseParse })
                router.go(Routes.Login)
                break;
            case 500:
                store.set({ token: undefined })
                store.set({ getTokenError: responseParse })
                router.go(Routes.Error)
                break;
            default:
                store.set({ getTokenError: { reason: "Неизвестная ошибка" } })
                break;
        }

    } catch (e) {
        store.set({ getTokenError: { reason: "Неизвестная ошибка" } })
        console.error(e);
    }
}

export const updateChatAvatar = async (formData: ChangeChatAvatarSubmitData) => {
    try {
        const data = await chatsApi.changeAvatar(formData);
        const { response, status } = data;
        const responseParse = JSON.parse(response);

        switch (status) {
            case 200:
                const currentActiveChat = store.getState().activeChat;
                if (currentActiveChat) {
                    const updatedChat: ChatsResponse = {
                        ...currentActiveChat,
                        avatar: responseParse.avatar,
                    };
                    store.set({
                        activeChat: updatedChat,
                    });
                    const chats = store.getState().chats?.map((chat: ChatsResponse) =>
                        chat.id === updatedChat.id ? updatedChat : chat
                    );
                    store.set({ chats });
                    store.set({ changeChatAvatarError: null });
                }
                break;
            case 400:
                store.set({ changeChatAvatarError: responseParse });
                break;
            case 401:
                store.set({ changeChatAvatarError: responseParse });
                router.go(Routes.Login);
                break;
            case 500:
                store.set({ changeChatAvatarError: responseParse });
                router.go(Routes.Error);
                break;
            default:
                store.set({ changeChatAvatarError: { reason: "Неизвестная ошибка" } });
                break;
        }
    } catch (error) {
        console.error(error);
        store.set({ changeChatAvatarError: { reason: "Неизвестная ошибка" } });
    }
};
