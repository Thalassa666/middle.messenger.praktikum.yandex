import Handlebars from 'handlebars';
import EventBus from './eventBus';
import { v4 as uuid } from "uuid";

export interface BlockProps {
    className?: string;
    events?: {
        [key: string]: (event: Event) => void;
    };
    [key: string]: unknown;
}

export default class Block<P extends BlockProps = BlockProps> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    };

    protected _id: string;
    private _element: HTMLElement | null = null;
    _meta: { tagName: string; props: P } | null = null;
    protected props: P;
    protected children: { [key: string]: Block } = {};
    private eventBus: () => EventBus;

    constructor(tagName: string = 'div', propsAndChildren: P) {
        const eventBus = new EventBus();
        const { children, props } = this._getChildrenAndProps(propsAndChildren);
        this._meta = { tagName, props: props as P };
        this._id = uuid();
        this.children = children as { [key: string]: Block };
        this.props = this._makePropsProxy({ ...props } as P);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _getChildrenAndProps(propsAndChildren: P) {
        const children: { [key: string]: Block } = {};
        const props: Partial<P> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                (props as Record<string, unknown>)[key] = value;
            }
        });

        return { children, props: props as P };
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._handleComponentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _createResources(): void {
        const { tagName } = this._meta!;
        this._element = this._createDocumentElement(tagName);
    }

    protected init(): void {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount(): void {
        this.componentDidMount();
        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    private _addEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            const targetElement = this._element?.querySelector('input') || this._element?.firstElementChild || this._element;
            targetElement!.addEventListener(eventName, events[eventName]);
        });
    }

    private _removeEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            const targetElement = this._element?.querySelector('input') || this._element?.firstElementChild || this._element;
            targetElement!.removeEventListener(eventName, events[eventName]);
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected componentDidMount(_oldProps?: P): void {}

    dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected componentDidUpdate(_oldProps: P, _newProps: P): boolean {
        return true;
    }

    public setProps(nextProps: Partial<P>): void {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    }

    get element(): HTMLElement | null {
        return this._element;
    }

    private _render(): void {
        const block = this.render();
        this._removeEvents();
        this._element!.innerHTML = '';
        this._element?.appendChild(block);

        this._addEvents();
    }

    protected compile(template: string, props: P) {
        const propsAndStubs: { [key: string]: unknown } = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        const compiledTemplate = Handlebars.compile(template);
        const resultTemplate = compiledTemplate(propsAndStubs);
        const fragment = document.createElement('template');
        fragment.innerHTML = resultTemplate;

        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            stub?.replaceWith(child.getContent()!);
        });

        return fragment.content;
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    public getContent(): HTMLElement | null {
        return this.element;
    }

    private _makePropsProxy(props: P): P {
        return new Proxy(props, {
            get: (target, prop: string) => {
                const value = target[prop as keyof P];
                return typeof value === 'function' ? value.bind(this) : value;
            },
            set: (target, prop: string, value) => {
                target[prop as keyof P] = value;

                this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },
            deleteProperty: () => {
                throw new Error('Нет доступа');
            }
        });
    }

    private _createDocumentElement(tagName: string): HTMLElement {
        const element = document.createElement(tagName);
        element.setAttribute('data-id', `${this._id}`);
        return element;
    }

    public show(): void {
        const element = this.getContent();
        if (element) {
            element.style.display = 'block';
        }
    }

    public hide(): void {
        const element = this.getContent();
        if (element) {
            element.style.display = 'none';
        }
    }
}
