import './header.css'
import Block, { BlockProps } from '../../../helpers/block.ts';
import headerTemplate from './header.hbs?raw';
import Handlebars from 'handlebars';

export interface HeaderProps extends BlockProps {
    inputId: string;
    inputName: string;
}

class Header extends Block<BlockProps> {
    constructor(props: HeaderProps) {
        super('div', props);
    }

    render(): string {
        const template = Handlebars.compile(headerTemplate);
        return template(this.props);
    }
}

export default Header;

