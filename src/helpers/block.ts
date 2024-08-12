import EventBus from "./eventBus";
import { nanoid } from "nanoid";
import Handlebars from "handlebars";
import { EventsType } from "../types/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PropsType = Record<string, any>;
type ChildrenType = Record<string, Block>;

export default class Block<
    P extends PropsType = PropsType,
    C extends ChildrenType = ChildrenType,
> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
    };

    children: C;
    props: P;
    eventBus: () => EventBus;
    protected _element: HTMLElement | null = null;
    _id: string = nanoid(6);

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */

    constructor(propsWithChildren: P | C) {
        const eventBus = new EventBus();

        const { props, children } =
            this._getChildrenAndProps(propsWithChildren);

        this.props = this._makePropsProxy({ ...props }) as P;

        this.children = children as C;

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        this._id = nanoid(6);

        eventBus.emit(Block.EVENTS.INIT);
    }

    private _makePropsProxy(props: PropsType): PropsType {
        return new Proxy(props, {
            get: (target, prop) => {
                const value = target[prop as string];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set: (target, prop, value) => {
                const oldTarget = { ...target };
                target[prop as string] = value;

                this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty: () => {
                throw new Error("Нет доступа");
            },
        });
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    private _init(): void {
        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    init(): void {}

    private _render(): void {
        const propsAndStubs = { ...this.props } as Record<string, unknown>;

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        const fragment = this._createDocumentElement(
            "template",
        ) as HTMLTemplateElement;

        const childrenProps: Block[] = [];

        Object.entries(propsAndStubs).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                propsAndStubs[key] = value
                    .map((item: Block) => {
                        if (item) {
                            childrenProps.push(item);
                            return `<div data-id="${item._id}"></div>`;
                        }
                        return item;
                    })
                    .join("");
            }
        });

        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
        const newElement: HTMLElement | null = fragment.content
            .firstElementChild as HTMLElement;

        [...Object.values(this.children), ...childrenProps].forEach((child) => {
            const stub = fragment.content.querySelector(
                `[data-id="${child._id}"]`,
            );
            stub?.replaceWith(child.getContent() || "");
        });

        if (this._element) {
            newElement.style.display = this._element.style.display;
            this._element.replaceWith(newElement);
        }

        this._element = newElement;

        this._addEvents();
    }

    render(): string {
        return "";
    }

    private _createDocumentElement(tagName: string): HTMLElement {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    protected _addEvents(): void {
        const { events } = this.props as Record<string, EventsType>;
        if (events !== null && events !== undefined) {
            Object.keys(events).forEach((eventName) => {
                if (Array.isArray(events[eventName]))
                    events[eventName].forEach(
                        (event: EventListenerOrEventListenerObject) =>
                            this._element?.addEventListener(eventName, event),
                    );
            });
        }
    }

    private _removeEvents(): void {
        const { events } = this.props as Record<string, EventsType>;
        if (events !== null && events !== undefined) {
            Object.keys(events).forEach((eventName) => {
                if (Array.isArray(events[eventName]))
                    events[eventName].forEach(
                        (event: EventListenerOrEventListenerObject) =>
                            this._element?.removeEventListener(
                                eventName,
                                event,
                            ),
                    );
            });
        }
    }

    private _componentDidMount(): void {
        this.componentDidMount();

        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    componentDidMount(oldProps: PropsType = {}): void {
        oldProps;
    }

    dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(
        oldProps: PropsType = {},
        newProps: PropsType = {},
    ): void {
        this._removeEvents();
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps: PropsType, newProps: PropsType): boolean {
        oldProps;
        newProps;
        return true;
    }

    private _getChildrenAndProps(propsAndChildren: C | P): {
        children: Record<string, Block>;
        props: Record<string, unknown>;
    } {
        const children: Record<string, Block> = {};
        const props: Record<string, unknown> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props };
    }

    setProps = (nextProps: Record<string, unknown>): void => {
        if (nextProps === undefined) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    getElement(): HTMLElement | null {
        return this._element;
    }

    getContent(): HTMLElement | null {
        if (
            this._element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE
        ) {
            setTimeout(() => {
                if (
                    this._element?.parentNode?.nodeType !==
                    Node.DOCUMENT_FRAGMENT_NODE
                ) {
                    this.dispatchComponentDidMount();
                }
            }, 100);
        }
        return this._element;
    }

    show(): void {
        const element = this.getContent();
        if (element !== null) element.removeAttribute("style");
    }

    hide(): void {
        const element = this.getContent();
        if (element !== null) element.style.display = "none";
    }
}
