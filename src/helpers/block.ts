import EventBus from './eventBus';

interface BlockProps {
    className?: string;
    handlers?: Record<string, EventListener>;
    [key: string]: unknown;
}

export default class Block<P extends BlockProps = any> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    };

    private _element: HTMLElement;
    _meta: { tagName: string; props: P };
    private _handlers: Record<string, EventListener> = {};
    protected props: P;
    protected eventBus: () => EventBus;

    constructor(tagName = 'div', props: P) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };

        this._element = this._createDocumentElement(tagName); // Инициализация _element
        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _addHandlers(): void {
        const { handlers = {} } = this.props;
        this._handlers = handlers;

        Object.keys(handlers).forEach((handler) => {
            this._element.addEventListener(handler, handlers[handler]);
        });
    }

    private _removeHandlers(): void {
        Object.keys(this._handlers).forEach((handler) => {
            this._element.removeEventListener(handler, this._handlers[handler]);
        });
        this._handlers = {};
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._handleComponentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _createResources(): void {
        const { tagName, props } = this._meta;
        this._element = this._createDocumentElement(tagName);
        if (props.className) {
            this._element.classList.add(props.className);
        }
    }

    protected init(): void {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidMount(): void {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected componentDidMount(): boolean {
        return true;
    }

    private _handleComponentDidUpdate(args: unknown): void {
        const { oldProps, newProps } = args as { oldProps: P; newProps: P };
        this._componentDidUpdate(oldProps, newProps);
    }

    private _componentDidUpdate(oldProps: P, newProps: P): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    protected componentDidUpdate(oldProps: P, newProps: P): boolean {
        console.log(oldProps, newProps);
        return true;
    }

    public setProps(nextProps: Partial<P>): void {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    }

    get element(): HTMLElement {
        return this._element;
    }

    private _render(): void {
        const block = this.render();
        this._removeHandlers();
        this._addHandlers();
        this._element.innerHTML = block;
    }

    protected render(): string {
        return '';
    }

    public getContent(): HTMLElement {
        return this.element;
    }

    private _makePropsProxy(props: P): P {
        const self = this;
        return new Proxy(props, {
            get(target: P, prop: string | symbol | number) {
                const value = target[prop as keyof P];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: P, prop: string | symbol | number, value: any) {
                target[prop as keyof P] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }

    private _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    public show(): void {
        this.getContent().style.display = 'block';
    }

    public hide(): void {
        this.getContent().style.display = 'none';
    }
}
