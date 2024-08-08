type CBT = (...args: unknown[]) => void

type ListenersType = Record<string, CBT[]>

export default class EventBus {
    listeners: ListenersType = {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on (event: string, callback: (data?: any) => void): void {
        if (!Array.isArray(this.listeners[event])) {
            this.listeners[event] = []
        }
        this.listeners[event].push(callback)
    }

    off (event: string, callback: () => void): void {
        if (this.listeners[event] === undefined) {
            throw new Error(`Нет события: ${event}`)
        }
        this.listeners[event] = this.listeners[event].filter(listener => listener !== callback)
    }

    emit (event: string, ...args: unknown[]): void {
        if (this.listeners[event] === undefined) {
            return
        }
        this.listeners[event].forEach(function (listener) {
            listener(...args)
        })
    }
}
