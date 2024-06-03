import Block, { BlockProps } from '../../helpers/block.ts';
import buttonTemplate from './button.hbs?raw';

interface ButtonProps extends BlockProps {
    text: string;
    className?: string;
    page?: string;
    img?: string;
}

export default class ButtonForm extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super('div', {
            ...props,
        });
    }

    render(): DocumentFragment {
        return this.compile(buttonTemplate, this.props);
    }
}
