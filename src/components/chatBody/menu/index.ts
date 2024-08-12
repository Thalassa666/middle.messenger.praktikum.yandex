import Block from "../../../helpers/block";
import "./menu.css";
import MenuButton from "../menuButton";
import ChatButtons from "../buttons";

class Menu extends Block<Record<string, string | boolean>> {
    constructor(props: Record<string, string | boolean>) {
        super({
            ...props,
        });
        this.setProps({ showPanel: false });
    }

    init() {
        const toggleBind = this._toggleMenu.bind(this);
        const buttonShow = new MenuButton({
            className: "chatControl__buttonShow",
            events: {
                click: [toggleBind],
            },
        });

        const chatButtons = new ChatButtons({
            className: "chatControl__chatsControlButtons",
        });

        this.children = {
            ...this.children,
            buttonShow,
            chatButtons,
        };
    }

    private _toggleMenu() {
        this.setProps({ showPanel: !this.props.showPanel });
    }

    render(): string {
        return `
            <div class="chatMenu {{className}}">
                {{{buttonShow}}}
                ${
                    this.props.showPanel
                        ? `
                        {{{chatButtons}}}
                    `
                        : ""
                }
            </div>
        `;
    }
}

export default Menu;
