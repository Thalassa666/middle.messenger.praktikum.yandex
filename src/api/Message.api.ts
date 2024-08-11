import { WSTransport } from "../helpers/WSTransport";

const messageApi = new WSTransport();

export default class MessageApi {
    async connect(uid: number, chatId: number, token: string) {
        return await messageApi.connect(uid, chatId, token)
    }

    async close() {
        return messageApi.close()
    }
}
