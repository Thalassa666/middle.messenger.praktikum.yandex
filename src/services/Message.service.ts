import Store from "../helpers/Store";
import { WSTransport } from "../helpers/WSTransport";
import { ChatMessageType, Message } from "../types/types";
import { getToken } from "./Chats.service";

const store = Store;

export class MessageService {
    socket = new WSTransport("wss://ya-praktikum.tech/ws/chats");
    connectChat = async (uid: number, chatId: number) => {
        try {
            const { token } = await getToken(chatId);
            await this.socket.connect(uid, chatId, token);

            const { sockets } = store.getState();
            sockets?.push({
                chatId,
                socket: this.socket,
            });
            store.set({
                sockets,
            });

            this.socket.on("message", (data: Message) => {
                const { messages = [] } = store.getState();

                if (Array.isArray(data))
                    store.set({
                        messages: messages.reverse().concat(data.reverse()),
                    });

                if (!Array.isArray(data)) {
                    store.set({
                        messages: [...messages, { ...data, chat_id: chatId }],
                    });
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    send = async (message: ChatMessageType) => {
        this.socket.send(message);
    };

    getOld = async (offset = 0) => {
        await this.send({
            type: "get old",
            content: offset.toString(),
        });
    };

    disconnectChat = () => {
        try {
            this.socket.close();
        } catch (error) {
            console.error(error);
            store.set({
                changeUserDataError: { reason: "Неизвестная ошибка" },
            });
        }
    };

    clearMessageList() {
        store.set({ messages: [] });
    }
}
