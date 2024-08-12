import "./header.css";
import Block from "../../../helpers/block.ts";
import ButtonForm from "../../../components/button";
import Router from "../../../helpers/Router";
import { Routes } from "../../../main";

const router = Router;

export interface HeaderProps {
    inputId?: string;
    inputName?: string;
}

class Header extends Block {
    constructor(props: HeaderProps) {
        super({
            ...props,
            ProfileButton: new ButtonForm({
                text: "Профиль",
                type: "button",
                className: "header__profile-link",
                events: {
                    click: [
                        () => {
                            router.go(Routes.Profile);
                        },
                    ],
                },
            }),
        });
    }

    render(): string {
        return `
        <div class="header">
          {{{ ProfileButton }}}
          <div class="header__search">
            <label
            for="{{inputId}}"
            class="header__search_label"
            >
            </label>
            <input
            type="search"
            id="{{inputId}}"
            name="{{inputName}}"
            value=""
            class="header__search_input"
            placeholder="Search"
            >
          </div>
        </div>
        `;
    }
}

export default Header;
