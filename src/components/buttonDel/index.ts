import Block from '../../helpers/block.ts';
import './buttonDel.css';
import { EventsType } from "../../types/types";

type ButtonDelProps = {
    events?: EventsType;
    className?: string;
    title?: string;
}

class ButtonDel extends Block<ButtonDelProps> {
    constructor(props: ButtonDelProps) {
        super({
            ...props
        })
    }

    render(): string {
        return `
            <div class="buttonDel__container">
                <div class="buttonDel {{className}}">
                    <span class="buttonDel__cross">
                        <span class="cross_1"></span>
                        <span class="cross_2"></span>
                    </span>
                </div>
                {{title}}
            </div>
        `
    }
}

export default ButtonDel
