import Block, { BlockProps } from '../../helpers/block';
import inputFormTemplate from './input.hbs?raw';

export interface InputFormProps extends BlockProps {
    type: string;
    name: string;
    placeholder: string;
    className?: string;
}

class InputForm extends Block<InputFormProps> {
    constructor(props: InputFormProps) {
        super('div', props);
    }

    render(): DocumentFragment {
        return this.compile(inputFormTemplate, this.props);
    }
}

export default InputForm;
