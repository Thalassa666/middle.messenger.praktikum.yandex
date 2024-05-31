import Block from '../../helpers/block';
import ButtonFormTemplate from './button.hbs?raw';
import Handlebars from 'handlebars';

export interface ButtonFormProps {
    class: string;
    type: string;
    page?: string;
    text: string;
    handlers?: Record<string, (event: Event) => void>;
}

class ButtonForm extends Block {
    constructor(props: ButtonFormProps) {
        super('button', props);
    }

    render(): string {
        const template = Handlebars.compile(ButtonFormTemplate);
        return template(this.props);
    }
}

export default ButtonForm;
