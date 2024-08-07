import { ChatMessageType } from "../types/types";
import EventBus from "./eventBus";

enum WSTransportEvents {
    Error = 'error',
    Connected = 'connected',
    Close = 'close',
    Message = 'message'
}


export class WSTransport extends EventBus {

    private socket?: WebSocket
    private pingInterval?: ReturnType<typeof setInterval>
    private readonly pingIntervalTime = 1000 * 60 * 2
    private url: string

    constructor(url: string = 'wss://ya-praktikum.tech/ws/chats') {
        super()
        this.url = url
    }

    public connect(uid: number, chatId: number, token: string): Promise<void> {

        if (this.socket) {
            throw new Error('The socket already connected')
        }

        this.socket = new WebSocket(this.url + `/${uid}/${chatId}/${token}`)
        this.subscribe(this.socket)
        this.setupPing()
        console.log(this.socket)

        return new Promise((resolve, reject) => {
            this.on(WSTransportEvents.Error, reject)
            this.on(WSTransportEvents.Connected, () => {
                this.off(WSTransportEvents.Error, reject)
                resolve()
            })
        })
    }
    public send(data: ChatMessageType) {
        if (!this.socket) {
            throw new Error('Socket is not connected')
        }
        if (data.content?.length) this.socket.send(JSON.stringify(data))
    }

    public close() {
        this.socket?.close()
        this.socket = undefined
    }

    private subscribe(socket: WebSocket) {
        socket.addEventListener('open', () => {
            console.log('Соединение установлено')
            this.emit(WSTransportEvents.Connected)
        })
        socket.addEventListener('close', (event) => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            this.emit(WSTransportEvents.Close)
        })
        socket.addEventListener('error', (e) => {
            console.log('Ошибка', e)
            this.emit(WSTransportEvents.Error, e)
        })
        socket.addEventListener('message', (message) => {
            try {
                const data = JSON.parse(message.data)
                // console.log('Получены данные', data);
                if (['pong', 'user connected'].includes(data?.type)) {
                    return
                }
                this.emit(WSTransportEvents.Message, data)
            } catch (e) {
                console.error(e);
            }
        })
    }

    private setupPing() {
        this.pingInterval = setInterval(() => {
            this.send({ type: 'ping' })
        }, this.pingIntervalTime)

        this.on(WSTransportEvents.Close, () => {
            clearInterval(this.pingInterval)
            this.pingInterval = undefined
        })
    }
}
