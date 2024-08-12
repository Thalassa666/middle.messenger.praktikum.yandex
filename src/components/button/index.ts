import Block from "../../helpers/block.ts";
import { EventsType } from "../../types/types.ts";

interface ButtonProps {
    text: string;
    type: string;
    className?: string;
    page?: string;
    img?: string;
    events: EventsType;
}

export default class ButtonForm extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super({
            ...props,
        });
    }

    render(): string {
        return `
        <button class="{{className}}" type="{{type}}" data-page="{{page}}">{{text}}</button>
        `;
    }
}
