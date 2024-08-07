import Block from "./block";

type Constructable<T = any> = new (...args: any[]) => T;

type RouteProps = {
    rootQuery: string
}

export default class Route<T = Record<string, unknown>> {
    private _pathname: string
    private _blockClass: Constructable<Block<Record<string, unknown>>>
    private _block: Block<Record<string, unknown>> | null
    private _props: T & RouteProps

    constructor(pathname: string, view: Constructable<Block<Record<string, unknown>>>, props: T & RouteProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return pathname === this._pathname;
    }

    private _renderDom(query: string, block: Block) {
        const root = document.querySelector(query);
        root?.append(block.getContent() as Node);
    }

    render(): void {
        if (!this._block) {
            this._block = new this._blockClass({});
            this._renderDom(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}
