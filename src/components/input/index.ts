import Block, { BlockProps } from '../../helpers/block';
import inputFormTemplate from './input.hbs?raw';
import Handlebars from 'handlebars';

export interface InputFormProps extends BlockProps {
    type: string;
    name: string;
    placeholder: string;
}

class InputForm extends Block<InputFormProps> {
    constructor(props: InputFormProps) {
        super('div', props);
    }

    render(): string {
        const template = Handlebars.compile(inputFormTemplate);
        return template(this.props);
    }
}

export default InputForm;
