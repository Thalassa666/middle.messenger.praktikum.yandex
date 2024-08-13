import Block from "../../helpers/block";
import { EventsType } from "../../types/types";

export interface InputFormProps {
    type: string;
    name: string;
    value?: string;
    placeholder: string;
    className?: string;
    events?: EventsType;
}

class InputForm extends Block<InputFormProps> {
    constructor(props: InputFormProps) {
        super(props);
    }

    _addEvents() {
        super._addEvents();

        const inputElement = this.getContent()?.querySelector("input");
        if (inputElement && this.props.events?.blur) {
            this.props.events.blur.forEach((func) => {
                inputElement.addEventListener("blur", func);
            });
        }
    }

    render(): string {
        return `
        <div class="input_container">
           <input
           class="input {{className}}"
           name="{{name}}"
           type="{{type}}"
           placeholder="{{placeholder}}"
           value="{{value}}"
           >
        </div>
        `;
    }
}

export default InputForm;
