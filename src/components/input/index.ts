import Block from '../../helpers/block';
import inputFormTemplate from './input.hbs?raw';
import Handlebars from 'handlebars';

interface InputFormProps {
    type: string;
    name: string;
    placeholder: string;
}

class InputForm extends Block {
    constructor(props: InputFormProps) {
        super('div', props);
    }

    render(): string {
        const template = Handlebars.compile(inputFormTemplate);
        return template(this.props);
    }
}

export default InputForm;
