import Block from '../../helpers/block';
import { EventsType } from "../../types/types.ts";

export interface InputFormProps {
    type: string;
    name: string;
    value?: string;
    placeholder: string;
    className?: string;
    events?: EventsType
}

class InputForm extends Block<InputFormProps> {
    constructor(props: InputFormProps) {
        super(props);
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
        `
    }
}

export default InputForm;
