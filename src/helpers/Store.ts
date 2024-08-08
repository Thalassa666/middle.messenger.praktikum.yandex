import { ChatUserResponse, ChatsResponse, Message, SocketType, UserResponse } from '../types/types.ts';
import EventBus from './eventBus';

export enum StoreEvents {
    Updated = 'Updated'
}

export type HttpErrorType = {
    reason: string;
    status?: number;
}

export interface IState {
    loginError?: HttpErrorType | null;
    chats?: ChatsResponse[];
    currentUser?: UserResponse | null;
    usersSearch?: UserResponse[];
    activeChat?: ChatsResponse | null;
    activeChatUsers?: ChatUserResponse[];
    token?: string;
    sockets?: SocketType[];
    messages?: Message[],
}

export interface INextState {
    [x: string]: any;
    chats?: ChatsResponse[];
    currentUser?: UserResponse | null;
    usersSearch?: UserResponse[];
    activeChat?: ChatsResponse | null;
    activeChatUsers?: ChatUserResponse[];
    token?: string;
    sockets?: SocketType[];
    messages?: Message[],
    loginError?: HttpErrorType | null;
    createUserError?: HttpErrorType | null;
    getUserError?: HttpErrorType | null;
    logoutError?: HttpErrorType | null;
    getChatsError?: HttpErrorType | null;
    changeUserDataError?: HttpErrorType | null;
    deleteChatError?: HttpErrorType | null;
    changeAvatarError?: HttpErrorType | null;
    getActiveChatUsersError?: HttpErrorType | null;
    changePasswordError?: HttpErrorType | null;
}

const defaultState: IState = {
    loginError: null,
    chats: [],
    currentUser: null,
    usersSearch: [],
    activeChat: null,
    activeChatUsers: [],
    sockets: [],
    messages: [],
}

class Store extends EventBus {
    // @ts-expect-error
    private state: IState = defaultState;

    private static __instance: Store

    constructor(defaultState: IState) {
        if (Store.__instance) {
            return Store.__instance;
        }
        super();

        this.state = defaultState;
        this.set(defaultState);

        Store.__instance = this;
    }

    public getState() {
        return this.state;
    }

    public set(nextState: INextState) {
        const prevState = { ...this.state };

        this.state = { ...this.state, ...nextState };

        this.emit(StoreEvents.Updated, prevState, nextState);
    }
}

export default new Store(defaultState)
