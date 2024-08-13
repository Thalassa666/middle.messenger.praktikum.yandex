import Block from "../../helpers/block.ts";
import "./buttonAdd.css";
import { EventsType } from "../../types/types";

type ButtonAddProps = {
    events?: EventsType;
    className?: string;
    title?: string;
};

class ButtonAdd extends Block<ButtonAddProps> {
    constructor(props: ButtonAddProps) {
        super({
            ...props,
        });
    }

    render(): string {
        return `
            <div class="buttonAdd__container">
                <div class="buttonAdd {{className}}">
                    <span class="buttonAdd__cross">
                        <span class="cross_1"></span>
                        <span class="cross_2"></span>
                    </span>
                </div>
                {{title}}
            </div>
        `;
    }
}

export default ButtonAdd;
